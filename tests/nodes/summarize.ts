import { Board, asRuntimeKit } from "@google-labs/breadboard";
import path from "path";
import test from 'ava';
import { TransformersJS } from "@paulkinlan/transformerjs-breadboard-kit";

test('summarize', async (t) => {

  t.timeout(100000)

  const board = await Board.load(
    path.join(process.cwd(), "graphs", "summarize.json")
  );

  const result = await board.runOnce({
    model: "Xenova/distilbart-cnn-6-6",
    input: "Paul Kinlan is a Developer Advocate for Chrome and the Web. He works for Google and lives in North Wales.",
  }, { kits: [asRuntimeKit(TransformersJS)] });


  t.truthy((<any>result["text"])[0].summary_text);
});
