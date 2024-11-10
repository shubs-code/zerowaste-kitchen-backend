const axios=require("axios");
require("dotenv").config();

const recipe = async (req, res) => {
    const {foodItems} = req.body;
  
    // Separate items into yellow (expiring soon) and green (fresh)
    const yellowItems = foodItems.filter((item) =>
      new Date(item.expiry) < new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    );
    const greenItems = foodItems.filter((item) =>
      new Date(item.expiry) >= new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    );
  
    // Select 70% from yellow and 30% from green
    const selectedItems = [
      ...yellowItems.slice(0, Math.ceil(yellowItems.length * 0.7)),
      ...greenItems.slice(0, Math.ceil(greenItems.length * 0.3)),
    ];
  
    console.log("Selected items for recipe:", selectedItems);
  
    const prompt = `Suggest a recipe using the following ingredients: ${selectedItems
      .map((item) => item.name)
      .join(", ")}. Make sure 70% or more of the ingredients are from those marked as 'close to expiry'.`;
  
    try {
      // Your API Key for Google Generative Language API
      const apiKey = process.env.GOOGLE_API_KEY; // Ensure it's in your .env file
  
      // The API endpoint for Gemini 1.5 Content Generation
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCv_LfJGWxKtLinetSmDIOHN6_-eebqWJc`;
  
      // Define the request body following the correct format (based on the working curl request)
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt
              },
            ],
          },
        ],
      };
  
      // Make the POST request to the Generative Language API
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Log the response to see its structure
      console.log("Gemini Response:", response.data);
  
      // Extract the generated recipe from the response
      const recipe = response.data?.candidates[0]?.content?.parts[0]?.text;
      console.log(response.data?.candidates[0]?.content)
      if (recipe) {
        // Send the generated recipe back as JSON
        res.status(200).json({ recipe });
      } else {
        // Handle case where the response structure wasn't as expected
        res.status(500).json({ error: "Failed to extract recipe from response" });
      }
    } catch (error) {
      console.error("Error fetching recipe from Gemini:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch recipe" });
    }
  };
  
module.exports = {
  recipe,
};
