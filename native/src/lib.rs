use std::path::PathBuf;
use neon::prelude::*;
use neon::register_module;
use pastelogue::process_dir;

fn hello_world(mut cx: FunctionContext) -> JsResult<JsString> {
    process_dir(&PathBuf::from("/pathtophotos"));
    Ok(cx.string(std::env::current_exe().unwrap().to_str().unwrap()))
}

register_module!(mut m, { m.export_function("helloWorld", hello_world) });
