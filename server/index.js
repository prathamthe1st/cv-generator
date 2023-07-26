const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);

/*
	?So, when the generateID function is called, it generates a random number between 0 and 1, converts it to a base-36 string, 
	?and extracts a substring to create a unique identifier consisting of alphanumeric characters. This identifier can be used, 
	?for example, to assign a unique ID to a data entry in a database or to create a temporary identifier for some process.
*/

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "uploads");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now() + path.extname(file.originalname));
// 	},
// });

/*
	?This code sets up the configuration for storing uploaded files using Multer. 
	?It specifies the destination folder where files will be saved and generates a unique filename for each file 
	?based on the current timestamp and the original file extension.
*/

// const upload = multer({
// 	storage: storage,
// 	limits: { fileSize: 1024 * 1024 * 5 },
// });

/*
	?This code initializes the Multer middleware with the previously defined storage configuration. 
	?It sets a limit on the file size to 5 megabytes (5MB). It prepares the middleware for handling file 
	?uploads and applies the storage and size limit settings.
*/

const configuration = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const database = [];

const ChatGPTFunction = async (text) => {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: text,
		temperature: 0.6,
		max_tokens: 250,
		top_p: 1,
		frequency_penalty: 1,
		presence_penalty: 1,
	});
	return response.data.choices[0].text;
};

/*
	?Explaination for the parameters used in the ChatGPTFunction:

	?1. model: "text-davinci-003": Specifies the model to be used for generating the completion (in this case, "text-davinci-003").

	?2. prompt: text: Sets the text prompt for the completion, which serves as the starting point for generating the response.

	?3. temperature: 0.6: Controls the randomness of the generated output, with higher values producing more random responses.

	?4. max_tokens: 250: Limits the length of the generated completion to a maximum of 250 tokens.

	?5. top_p: 1: Sets the cumulative probability threshold for the generated tokens, ensuring that the response is within the specified probability.

	?6. frequency_penalty: 1: Adjusts the penalty applied to frequently used tokens, reducing their likelihood in the generated response.

	?7. presence_penalty: 1: Controls the penalty applied to infrequently used tokens, encouraging their inclusion in the generated completion.
*/

app.post("/cv", async (req, res) => {

	const {
		personalInfo,
		educations,
		workExperiences,
		projects,
		otherInfo
	} = req.body;

	const newEntry = {
		id: generateID(),
		personalInfo,
		educations,
		workExperiences,
		projects,
		otherInfo
	};

	// const prompt1 = `I am writing a CV  for myself, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technologies: ${currentTechnologies}. Can you write a 50 words description for the top of the resume(first person writing)?`;

	// // const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 5 points for a resume on what I am good at?`;

	// const prompt2 = `Can you write 5 points for a resume on what I am good at?`;

	// const remainderText = () => {
	// 	let stringText = "";
	// 	for (let i = 0; i < workArray.length; i++) {
	// 		stringText += ` ${workArray[i].name} as a ${workArray[i].position}.`;
	// 	}
	// 	return stringText;
	// };

	// // const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${workArray.length
	// // 	} companies. ${remainderText()} \n Can you write me 25 words for each company seperated in numbers of my succession in the company (in first person)?`;

	// const prompt3 = `During my years I worked at ${workArray.length
	// 	} companies. ${remainderText()} \n Can you write me 25 words for each company seperated in numbers of my succession in the company (in first person)?`;

	// const objective = await ChatGPTFunction(prompt1);
	// const keypoints = await ChatGPTFunction(prompt2);
	// const jobResponsibilities = await ChatGPTFunction(prompt3);

	// const chatgptData = { objective, keypoints, jobResponsibilities };
	// const data = { ...newEntry, ...chatgptData };
	// database.push(data);

	res.json({
		message: "Request successful!",
		newEntry: newEntry,
	});
});

/*
	?This code is an endpoint handler for the /cv/create route that handles the creation of a new CV. 
	?It retrieves the necessary data from the request body, such as full name, current position, length, technologies, and work history. 
	?It parses the work history into an array and generates unique identifiers for the new CV entry.

	?The code then constructs prompts using the retrieved data and calls the ChatGPTFunction to generate descriptions for the CV. 
	?The generated responses are assigned to the objective, keypoints, and jobResponsibilities variables.

	?Finally, the code combines the generated data with the input data, stores it in the database array, 
	?and sends a JSON response containing the created CV data, along with a success message.
*/

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
