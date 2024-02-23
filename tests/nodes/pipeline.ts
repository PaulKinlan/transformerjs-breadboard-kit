import { Board, asRuntimeKit } from "@google-labs/breadboard";
import path from "path";
import test from "ava";
import { TransformersJS } from "@paulkinlan/transformerjs-breadboard-kit";
import { pathToFileURL } from "url";

test("sentiment-analysis pipeline", async (t) => {
  const board = await Board.load("sentiment.json", {
    base: pathToFileURL(path.join(process.cwd(), "graphs", "/")),
  });

  const result = await board.runOnce(
    {
      model: "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
      task: "sentiment-analysis",
      input: "Cars the movie is great!!",
    },
    { kits: [asRuntimeKit(TransformersJS)] }
  );

  t.is((<any>result["text"])[0].label, "POSITIVE");
});
