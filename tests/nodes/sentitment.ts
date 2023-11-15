import { Board, asRuntimeKit } from "@google-labs/breadboard";
import path from "path";
import test from 'ava';
import { TransformersJS } from "@paulkinlan/transformerjs-breadboard-kit";

test('sentiment-analysis sentiment-node', async (t) => {
  const board = await Board.load(
    path.join(process.cwd(), "graphs", "sentiment-node.json")
  );

  const result = await board.runOnce({
    model: "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
    input: "Cars the movie is great!!",
  }, { kits: [asRuntimeKit(TransformersJS)] });

  t.is((<any>result["text"])[0].label, "POSITIVE");
});