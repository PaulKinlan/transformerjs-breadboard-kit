import { Board, asRuntimeKit, board, base } from "@google-labs/breadboard";
import path from "path";
import test from "ava";
import {
  TransformersJSKit,
  transformersjs,
} from "@paulkinlan/transformerjs-breadboard-kit";
import { pathToFileURL } from "url";

test("summarize", async (t) => {
  t.timeout(100000);

  const board = await Board.load("summarize.json", {
    base: pathToFileURL(path.join(process.cwd(), "graphs", "/")),
  });

  const result = await board.runOnce(
    {
      model: "Xenova/distilbart-cnn-6-6",
      input:
        "Paul Kinlan is a Developer Advocate for Chrome and the Web. He works for Google and lives in North Wales.",
    },
    { kits: [asRuntimeKit(TransformersJSKit)] }
  );

  t.truthy((<any>result["text"])[0].summary_text);
});

test("summarize summarize-node with board", async (t) => {
  const summerizeBoard = await board(({ text, model }) => {
    text.isString();
    model.isString();

    const summarynode = transformersjs.summarize({
      $id: "summary",
      input: text,
      model,
    });

    return summarynode.to(base.output());
  }).serialize({
    title: "summary-node",
    version: "0.1.0",
  });

  const newBoard = await Board.fromGraphDescriptor(summerizeBoard);

  const result = await newBoard.runOnce(
    {
      model: "Xenova/distilbart-cnn-6-6",
      text: "Paul Kinlan is a Developer Advocate for Chrome and the Web. He works for Google and lives in North Wales.",
    },
    { kits: [asRuntimeKit(TransformersJSKit)] }
  );

  t.truthy((<any>result["modelOutput"])[0].summary_text);
});
