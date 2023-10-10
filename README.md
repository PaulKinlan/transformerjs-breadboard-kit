# "Google Labs Breadboard" TransformerJS Nodes Kit

This is a collection of [Breadboard](https://github.com/google/labs-prototypes/tree/main/seeds/breadboard) nodes that let you integrate `transformerjs` in to your apps built with Breadboard.

## Installing

This Kit requires Node version >=v19.0.0. To install:

```sh
npm install @paulkinlan/transformerjs-breadboard-kit
```

## Node Types

Here are all node handlers that are included in the OpenAI Breadboard Kit

### The `pipeline` node

Takes an `input` 

#### Inputs:

- `input` required. The value to be checked if undefined.
- `task` required. The transformerjs task to be used (tested: `sentiment-analysis`, `summarize`)
- `model` optional.

#### Outputs:

- `modelResult` - likely an array of results returned by the `transfomerjs` logic as defined by `task` and `model`

### The `summarize` node

- `input` required. The text to be summarized.
- `model` optional. The model to use. This will be loaded by transformjs. The default is `Xenova/distilbart-cnn-6-6`.

#### Outputs:

- `modelResult` - an array of `{ "summary_text": "[some text]" }`

### The `sentiment-analysis` node

- `input` required. The text to be analysed for sentiment.
- `model` optional. The model to use. This will be loaded by transformjs. The default is `Xenova/distilbert-base-uncased-finetuned-sst-2-english`.

#### Outputs:

- `modelResult` - an array of objects of the form: `{ "label":  "POSITIVE", "confidence": 0.9995 }`
