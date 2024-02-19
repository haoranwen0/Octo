# Octo

[Demo](https://drive.google.com/file/d/1MGeQspkgyJGoCoMapt9H4dHqgTm7qREe/view)

### Motivation/Purpose

In our classes and internships, we were expected to create systems diagrams explaining our approach for the project. We found that it took a long time to create these diagrams, and we would need to continuously refine them manually after receiving feedback. To save time, we wanted to harness the power of large language models and interact with diagrams by using language. 

### Technical Focus

We built on top of Langchain and used GPT Assistants API. We also scraped data from multiple sources and placed them in a vector database, so they could be utilized with RAG. One challenge was that initially, GPT was taking a long time to respond to queries, i.e. 40-60seconds. However, through experimentation and prompt tuning techniques, we brought it down to <7 seconds -- a similar response time to ChatGPT. Future goals could be to use an open source LLM that we fine-tune. 

### Future of this project
For the time being, we have stopped development of this project. This repository is an MVP we made, and then we collected feedback from potential users. We found that our differentiating factor was not enough -- other large whiteboarding companies can easily incorporate this feature into their product. Moreover, we wouldn't be able to capture enough value because generally, a whiteboarding tool is used relatively sparingly. For example, compare the usage of an IDE with a diagramming tool -- a developer will be using their IDE for 8 hours a day; however, they might use a diagramming tool once in a week. 

Even though we won't be continuing with this project, we learned a lot about the market research and value creation/capture process and will continue building projects that are impactful. 
