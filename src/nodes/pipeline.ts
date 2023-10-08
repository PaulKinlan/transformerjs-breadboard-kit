/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues, OutputValues } from "@google-labs/graph-runner";
import { Pipeline, pipeline } from "@xenova/transformers";

export type PipelineOutputs = OutputValues & {
  modelOutput: any | any[];
};

export type PipelineInputs = InputValues & {
  task: string;
  model: string;
  input: any;
};

export default async (inputs: InputValues): Promise<PipelineOutputs> => {
  const { task, model, input } = inputs as PipelineInputs;

  const pipelineInstance = await pipeline(task, model);

  return { modelOutput: await pipelineInstance(input) }
};