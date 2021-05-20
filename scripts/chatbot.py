import random
import json
import pickle
import numpy as np
import sys

import nltk
from nltk.stem import WordNetLemmatizer

from tensorflow.keras.models import load_model

import time
start_time = time.time()

file_url = "./scripts/"
#file_url = "D:\\Projects\\API Projects\\coastella-api\\tflow\\"

lemmetizer = WordNetLemmatizer()
intents = json.loads(open(file_url+"intents.json").read())

words = pickle.load(open(file_url+"words.pkl", "rb"))
classes = pickle.load(open(file_url+"classes.pkl", "rb"))

model = load_model(file_url+"chatbotmodel.h5")


def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmetizer.lemmatize(word) for word in sentence_words]
    return sentence_words


def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = i
    return np.array(bag)


def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    results = sorted(results, key=results.index, reverse=True)
    return_list = []

    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list


def get_response(intents_list, intents_json):
    tag = intents_list[0]["intent"]
    return tag


message = sys.argv[1]
ints = predict_class(message)
res = get_response(ints, intents)
# print("Hello World!")
print(res)
