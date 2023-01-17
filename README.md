# Introduction

Vocabulary acquisition for foreign language learners is a solved problem in 2023. Language learning apps leverage [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) to optimize memorization and review of new words. If you need to memorize a comprehensive list of vocabulary words, you can use software like Anki to easily commit the words to long-term memory.

Even with ubiquitous spaced repetition software, _Grammar_ acquisition is still challenging, especially for foreign language learners who do not live in an immersive environment (eg: studying the language alone in their native country without access to native speakers). Although computer software has optimized the process of memorizing individual words, understanding a language is more than just matching a word to its definition. Language acquisition requires context and familiarity with grammatical patterns as well as the underlying context of a word.

Seeing vocabulary usage in context is essential for an independent language learner, but it can be difficult for a novice to acquire many useful example sentences when building a vocabulary. The task requires an understanding of the language as well as creativity. An independent language learner may not have the resources for gaining background context on obscure or advanced vocabulary words or grammar patterns.

Another problem with both textbooks and some software systems is that they place too much focus on reading and writing. They rarely provide audio samples and almost never provide the user with the opportunity to practice speaking. This creates a class of language learner who can read newspapers and pass written exams, yet lacks the ability to understand spoken language or verbally formulate sentences of their own.

This document proposes a new language learning software package that leverages recent technological advances to improve a learner's speaking and listening skills as well as vocabulary and grammar comprehension. It addresses the four main problems with current software solutions: a lack of vocabulary context and grammar usage, an inadequate focus on listening skills and a lack of speaking and pronunciation practice.

# Technological Developments and Limitations

Technical limitations have forced many language learning software packages to focus on reading and writing while neglecting the skills of speaking and listening. In the case that a language learning tool does provide listening or speaking capabilities, the material is often limited in nature and does not allow the user to add custom content such as would be possible with more open-ended note taking/flash card apps. This limitation means that even if a learner's software provides listening or speaking capabilities, they are confined to whatever curriculum is provided by the author and cannot expand the material to meet their own needs or interests. This limitation occurs because speaking and listening software often requires extensive effort on the part of the software author. The author must create, edit and record a corpus of example sentences which can be very resource intensive. Simply put, modern software has neglected listening and speaking skills because it was overly reliant on human intervention and therefore not something that could easily be addressed by software.

In the last five years, there have been three technological breakthroughs that I believe can overcome these limitations:

1. **Natural sounding text-to-speech systems.** This is advantageous because it eliminates the need for a native speaker to record audio for niche user-generated content that may not be useful to a wide audience. Many text-to-speech vendors (Google Cloud, AWS, Azure) now provide very natural sounding speech synthesis APIs which are leaps and bounds better than the robotic voices heard in earlier speech synthesis systems.
1. **Highly accurate speech-to-text systems.** Newer speech dictation and recognition software enables learners to receive rapid pronunciation feedback without requiring a human teacher. 
1. **Text completion APIs (GPT-3).** Text completion APIs enable multiple features required for language learning. GPT3 can generate example sentences for vocabulary words without human intervention and can also provide pass/fail assessments on listening and speaking drills when combined with speech-to-text systems.

I will use all three of these technologies when describing the theory of operation in the next section.

# Sentence Equivalence Determination

Before I explain how the proposed software will work, it is important to discuss an interesting capability of text completion APIs: they are able to determine if two sentences are "roughly equivalent". Modern text completion APIs are well suited for this task.

The following prompts are example of how GPT-based language models are able to grade a language learner's speaking ability. They are not theoretical examples- they represent actual outputs from OpenAI's Text Completion API.

Prompt 1:

The example below compares two Korean sentences that have the same meaning, but which are not identical

```
Two Korean example sentences are provided below.
Reply 'yes' if the sentence meanings are roughly equivalent, otherwise reply 'no'.
Sentence 1: "몇 시예요?".
Sentence 2: "지금 몇시입니까?"

=> Yes
```

Prompt 2:

The example below compares two Korean sentences that are not related.

```
Two Korean example sentences are provided below.
Reply 'yes' if the sentence meanings are roughly equivalent, otherwise reply 'no'.
Sentence 1: "카페에 가자!".
Sentence 2: "저는 불안해요."

=> No
```
 
Now that we are aware of the key technologies involved and how they will be used, let's discuss the basic operation of the software.

# Theory of Operation - Sentence Acquisition

1. The learner acquires a list of unknown vocabulary words. These words may have been acquired from reading printed materials (such as a language text) or informal sources such as television or daily conversations.
1. The learner inputs each word into a text input box with each word placed on a separate line.
1. Once the learner enters the vocabulary list, the software enters each word into a text completion API (such as GPT3) to create several example sentences for each word. You can see an example of several thousand example sentences in JSON format [here](./output.json). It is important to note that these examples were generated entirely by a computer with no human intervention.
1. The software plays the examples back to the user using text-to-speech synthesis and explains each sentence in the learner's native language. The user may optionally view the written version of the sentence to aide with comprehension though this is discouraged since the goal is to practice listening rather than reading.
1. After all sentences are introduced to the learner, the sentences are placed into a review queue which operates similarly to any other spaced repetition system.

# Theory of Operation - Dictation Drills

When the sentence under review is very new (or when the learner was not able to pass a previous review for the word) the software will perform a dictation drill.

1. An audio clip (via text-to-speech synthesis) is played to the user. The user may optionally view a written form of the sentence, though this is discouraged since the goal is to strengthen real-world listening skills.
1. The learner is asked to speak the sentence into the microphone three times.
1. The responses are entered into a text completion API (GPT3) to determine if the learner's response is _equivalent_ to the expected response. If two of the three responses are correct, the sentence is graded as "pass". Repetition is used to aide in memorization and also correct for occasional speech input errors. 
1. The response (pass/fail) is used to schedule the next review based on a spaced repetition scheme.

# Theory of Operation - Listening Drills

1. The learner is presented with a phrase in the target language which was created during the "Sentence Acquisition" phase.
1. The learner is asked to type a translation of the sentence in their native language.
1. The response is entered into a text completion API (GPT3) to determine if the learner's response is _equivalent_ to the expected translation. An exact letter-for-letter translation is not required and the user does not need to concern themselves with the exact word order or punctuation of the translation. If the translation is adequately similar to the expected translation, the response will be marked as correct.
1. The response (pass/fail) is used to schedule the next review based on a spaced repetition scheme.

# Theory of Operation - Speaking Drills

1. The learner is presented with a speaking prompt in their native language. Example: "How would you say "What time is it?" in Korean?" ("몇 시예요?").
1. The learner is presented with a voice recording dialog and a prompt.
1. The learner records a response in the target language (or clicks an "I don't know" button).
1. If the user provides a response, it is converted to text using a speech-to-text API.
1. A language model determines if the learner's response is _equivalent_ to the expected response.
1. A spaced repetition algorithm schedules the next review based on a pass/fail criteria.

# Conclusion

There are still some minor technical issues that need to be addressed, but I feel that most of the foundational technologies required are in a usable state and provide language learners with a net positive impact on learning outcomes.

If you have interests or skills that would benefit the creation of such a tool, please reach out to me by raising an issue or [contacting me](https://rickcarlino.com/about.html) directly.

The rest of this document is technical notes intended for software developers.

This document is a continuation of [A blog article I wrote many years ago about problems and solutions for spaced repetition systems (GPT3 was not a thing at that point in time)](https://rickcarlino.com/2019/problems-and-solutions-for-spaced-repetition-software.html).

---

# How I Generated the Examples

For each vocabulary word in a Korean language word frequency list, I sent GPT the following prompt:

```
Create a Korean example sentence with an accompanying English translation for the following word: $WORD. Provide the output as JSON.
```

Because GPT is non-deterministic, the output JSON would not have the same schema for every word. To compensate for this, I post-processed the data to make all JSON keys uniform.

An example of the Korean word "도구" ("tool") is provided below:

```
{
  "English": "I use tools to do the work.",
  "Korean":  "저는 도구를 사용해서 작업을 해요.",
  "word":    "도구"
}
```

The API requests were sent with a "temperature" of `0.20`.

# Problems

 * Sometimes GPT makes JSON typos (missing commas, missing quotation marks) which render the example unusable. This is mitigated by lowering the temperature.
 * Although grammar errors are rare, the output can create "awkard" sentences which follow the rules of the language but are not appropriate for language learning.
 * Awkwardness issues might be fixable by switching to a Korean-centric model, like Naver's CLOVA. UPDATE: CLOVA is for business use only. Individual API accounts are not available.
 * The prompt needs to be adjusted to focus on conversation rather than written speech.
 * Originally, I wanted to use GPT to generate the example sentences and then leverage Google Translate for English translations. I have now concluded that GPT is a far better translation tool than Google Translate. [See comparison here (feel free to leave comments)](https://docs.google.com/spreadsheets/d/1ksAo4iOZPOHaPC8go0mJBX6QBx8lvSN7sN33b38V_eg/edit?usp=sharing))
 * Some results were so short that they were not useful. For example, when prompted with an input of "그래도" ("nevertheless"), the resulting example sentence was "그래도," which is not particularly helpful for gaining vocabulary context. This can be avoided (but not entirely prevented) by raising the temperature. 

# TODO

 * Maybe run the prompts a second time and ask GPT to provide a "situation where you would say this"
 * IDEA: Use Dall-E to generate images for examples.
 * Find a Korean lemmatizer: https://spacy.io/usage
 * Try different models instead of DaVinci
 * [Try this suggestion from a Reddit user](https://www.reddit.com/r/IAmGilGunderson/comments/v80wv3/my_flashcard_routine_using_anki/)

# Principles

 * Complete phrases are better than isolated vocabulary words.
 * Learners have periods of idle time that can be used to improve skills (driving, walking, cleaning, etc..)
 * Every learner has different vocabulary needs, so it is essential that the learner eventually sets the curriculum.
 * Memorization of written materials is a solved problem.
 * Chat AI can help learners practice without fear of criticism.

