import { Board } from "@google-labs/breadboard";
import path from "path";
import test from 'ava';
import { TransformersJS, PipelineOutputs } from "@paulkinlan/transformerjs-breadboard-kit";

test('head', async (t) => {
  const board = await Board.load(
    path.join(process.cwd(), "graphs", "sentiment.json")
  );

  board.addKit(TransformersJS);

  const result = await board.runOnce({
    model: "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
    task: "sentiment-analysis",
    input: "Cars the movie is great!!",
  });

  t.is((<any>result["text"])[0].label, "POSITIVE" );
});
