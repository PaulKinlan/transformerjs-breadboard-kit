/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues, OutputValues } from "@google-labs/graph-runner";
import pipelineNode from "./pipeline.js";

export type SummarizeOutputs = OutputValues & {
  modelOutput: any | any[];
};

export type SummarizeInputs = InputValues & {
  model: string;
  input: any;
};

export default async (inputs: InputValues): Promise<SummarizeOutputs> => {
  const { model, input } = inputs as SummarizeInputs;

  const result = pipelineNode({ task: "summarization", model, input });

  return result;
};