import EventEmitter from 'events';
import { MediaItem } from './media-item';
import ThumbnailerService from '../thumbnailer/thumbnailer-service';
import LibraryRepository from './library-repository';
import { AppContextPaths } from '../application/app-context';
import { toRelativePath } from './path-converter';
import * as MediaItemGrouper from './media-item-grouper';
import { MediaItemsGroup } from './media-items-group';
import { ProgressPayload } from '../pastelogue/model';
import PastelogueClient from '../pastelogue/pastelogue-client';

const SCANNING_STARTED_EVENT = 'SCANNING_STARTED';
const SCANNING_FINISHED_EVENT = 'SCANNING_FINISHED';
const SCANNING_ON_ITEM_ADDED_EVENT = 'SCANNING_ON_ITEM_ADDED_EVENT';

interface ScanningProgress {
  current: number,
  total: number,
}

class LibraryService {
  private libraryRepository: LibraryRepository;
  private paths: AppContextPaths;
  private pastelogue: PastelogueClient;
  private eventEmitter: EventEmitter;

  constructor(libraryRepository: LibraryRepository, paths: AppContextPaths, pastelogue: PastelogueClient) {
    this.libraryRepository = libraryRepository;
    this.paths = paths;
    this.pastelogue = pastelogue;
    this.eventEmitter = new EventEmitter();

    this.pastelogue.onResponse((response) => {
      if (response.id === 'PROCESSING_PROGRESS') {
        this.addMediaItemFromProgressPayload(response.payload);
      }
    });
  }

  startScanning(): void {
    this.eventEmitter.emit(SCANNING_STARTED_EVENT);
    this.pastelogue.startProcessing(this.paths.libraryPath);
  }

  async getAllMediaItems(): Promise<MediaItem[]> {
    return this.libraryRepository.getAllItems();
  }

  async getAllMediaItemsGrouped(): Promise<MediaItemsGroup[]> {
    const items = await this.getAllMediaItems();
    return MediaItemGrouper.groupMediaItems(items);
  }

  onScanningStarted(callback: () => void): void {
    this.eventEmitter.on(SCANNING_STARTED_EVENT, callback);
  }

  onScanningFinished(callback: () => void): void {
    this.eventEmitter.on(SCANNING_FINISHED_EVENT, callback);
  }

  onScanningItemAdded(callback: (progress: ScanningProgress) => void): void {
    this.eventEmitter.on(SCANNING_ON_ITEM_ADDED_EVENT, callback);
  }

  private async addMediaItemFromProgressPayload(payload: ProgressPayload): Promise<void> {
    // Check if item with this file path already exists in the database
    const filePath = payload.file.output.path;
    const relativePath = toRelativePath(filePath, this.paths);
    const itemAlreadyExists = !!(await this.libraryRepository.findItemByPath(relativePath));
    if (itemAlreadyExists) return;

    // Generate thumbnail
    const thumbnail = await ThumbnailerService.generateThumbnail(filePath, this.paths);

    // Save item to database
    const item: MediaItem = {
      relativePath,
      thumbnail,
      createdAt: new Date(payload.metadata.createdAt),
    };
    await this.libraryRepository.addNewItem(item);

    // Send event
    const scanningProgress: ScanningProgress = payload.progress;
    this.eventEmitter.emit(SCANNING_ON_ITEM_ADDED_EVENT, scanningProgress);

    if (scanningProgress.current === scanningProgress.total) {
      this.eventEmitter.emit(SCANNING_FINISHED_EVENT);
    }
  }
}

export default LibraryService;
