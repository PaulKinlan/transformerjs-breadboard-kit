/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues, OutputValues } from "@google-labs/graph-runner";
import pipelineNode from "./pipeline.js";

export type SentimentAnalysisOutputs = OutputValues & {
  modelOutput: any | any[];
};

export type SentimentAnalysisInputs = InputValues & {
  model: string;
  input: any;
};

export default async (inputs: InputValues): Promise<SentimentAnalysisOutputs> => {
  const { model, input } = inputs as SentimentAnalysisInputs;

  return await pipelineNode({ task: "sentiment-analysis", model, input });
};