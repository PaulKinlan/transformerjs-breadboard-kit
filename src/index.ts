/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { KitBuilder } from "@google-labs/breadboard/kits";

import pipeline, { PipelineOutputs } from "./nodes/pipeline.js";
import sentiment from "./nodes/sentiment.js";
import summarize from "./nodes/summarize.js";

const coreHandlers = {
  pipeline,
  sentiment,
  summarize
};

/**
 * Syntactic sugar around the `coreHandlers` library.
 */

const TransformersJS = new KitBuilder({
  url: "npm:@paulkinlan/transformerjs-breadboard-kit",
  title: "TransformersJS",
  description: "A set of nodes for using TransformersJS",
  version: "0.0.1",
}).build(coreHandlers);

export default TransformersJS;
export { TransformersJS }

export type PipelineNodeType = ReturnType<typeof pipeline>;
export type SummarizeNodeType = ReturnType<typeof summarize>;
export type SentimentAnalysisNodeType = ReturnType<typeof sentiment>;
export type { PipelineOutputs };
export type MyKit = InstanceType<typeof TransformersJS>;

