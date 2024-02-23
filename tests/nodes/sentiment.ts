import { Board, asRuntimeKit, board, base } from "@google-labs/breadboard";
import path from "path";
import test from "ava";
import {
  transformersjs,
  TransformersJSKit,
} from "@paulkinlan/transformerjs-breadboard-kit";
import { pathToFileURL } from "url";

test("sentiment-analysis sentiment-node", async (t) => {
  const board = await Board.load("sentiment-node.json", {
    base: pathToFileURL(path.join(process.cwd(), "graphs", "/")),
  });

  const result = await board.runOnce(
    {
      model: "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
      input: "Cars the movie is great!!",
    },
    { kits: [asRuntimeKit(TransformersJSKit)] }
  );

  t.is((<any>result["text"])[0].label, "POSITIVE");
});

test("sentiment-analysis sentiment-node with board", async (t) => {
  const sentimentBoard = await board(({ text, model }) => {
    text.isString();
    model.isString();

    const sentimentNode = transformersjs.sentiment({
      $id: "sentiment",
      input: text,
      model,
    });

    return sentimentNode.to(base.output());
  }).serialize({
    title: "sentiment-node",
    version: "0.1.0",
  });

  const newBoard = await Board.fromGraphDescriptor(sentimentBoard);

  const result = await newBoard.runOnce(
    {
      model: "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
      text: "Cars the movie is great!!",
    },
    { kits: [asRuntimeKit(TransformersJSKit)] }
  );

  t.is((<any>result["modelOutput"])[0].label, "POSITIVE");
});
