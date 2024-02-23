/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { InputValues, OutputValues } from "@google-labs/breadboard";
import { Pipeline, pipeline, PipelineType } from "@xenova/transformers";

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
  const taskType: PipelineType = task as PipelineType;

  const pipelineInstance = (await pipeline(taskType, model)) as Pipeline;

  return { modelOutput: await pipelineInstance(input, {}) };
};
