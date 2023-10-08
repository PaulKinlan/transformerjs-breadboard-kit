/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NodeHandlers
} from "@google-labs/graph-runner";
import type {
  BreadboardNode,
  Kit,
  NodeFactory,
  OptionalIdConfiguration,
} from "@google-labs/breadboard";

import pipeline, { PipelineInputs, PipelineOutputs } from "./nodes/pipeline.js";
import sentiment, { SentimentAnalysisInputs, SentimentAnalysisOutputs } from "./nodes/sentiment.js";
import summarize, { SummarizeInputs, SummarizeOutputs } from "./nodes/summarize.js";

const coreHandlers = {
  pipeline,
  sentiment,
  summarize
};

/**
 * Syntactic sugar around the `coreHandlers` library.
 */
export class TransformersJS implements Kit {
  url = "npm:@paulkinlan/breadboard-utils-kit";
  #nodeFactory: NodeFactory;
  #handlers: NodeHandlers;

  get handlers() {
    return this.#handlers;
  }

  constructor(nodeFactory: NodeFactory) {
    this.#nodeFactory = nodeFactory;
    this.#handlers = coreHandlers;
  }

  pipeline<In = PipelineInputs, Out = PipelineOutputs>(
    config: OptionalIdConfiguration = {}
  ): BreadboardNode<In, Out> {
    const { $id, ...rest } = config;
    return this.#nodeFactory.create("pipeline", { ...rest }, $id);
  }

  sentiment<In = SentimentAnalysisInputs, Out = SentimentAnalysisOutputs>(
    config: OptionalIdConfiguration = {}
  ): BreadboardNode<In, Out> {
    const { $id, ...rest } = config;
    return this.#nodeFactory.create("sentiment", { ...rest }, $id);
  }

  summarize<In = SummarizeInputs, Out = SummarizeOutputs>(
    config: OptionalIdConfiguration = {}
  ): BreadboardNode<In, Out> {
    const { $id, ...rest } = config;
    return this.#nodeFactory.create("summarize", { ...rest }, $id);
  }
}

export type PipelineNodeType = ReturnType<TransformersJS["pipeline"]>;
export type SummarizeNodeType = ReturnType<TransformersJS["summarize"]>;
export type SentimentAnalysisNodeType = ReturnType<TransformersJS["sentiment"]>;

export type { PipelineOutputs };
