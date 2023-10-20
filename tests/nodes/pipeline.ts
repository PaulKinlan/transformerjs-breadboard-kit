import { Board } from "@google-labs/breadboard";
import path from "path";
import test from 'ava';
import { TransformersJS } from "@paulkinlan/transformerjs-breadboard-kit";

test('sentiment-analysis pipeline', async (t) => {
  const board = await Board.load(
    path.join(process.cwd(), "graphs", "sentiment.json"),
    {
      kits: {
        "@paulkinlan/transformersjs-breadboard-kit": TransformersJS
      }
    }
  );

  const result = await board.runOnce({
    model: "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
    task: "sentiment-analysis",
    input: "Cars the movie is great!!",
  });

  t.is((<any>result["text"])[0].label, "POSITIVE");
});

