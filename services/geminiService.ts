
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, HealthMetrics, DietPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthSummary = async (profile: UserProfile, metrics: HealthMetrics) => {
  try {
    const prompt = `
      Act as a world-class nutritionist and fitness coach. 
      Analyze this user's profile and provide a brief, encouraging health summary and exactly 3 key tips for success.
      
      STRICT FORMATTING RULES:
      1. Use a numbered list for the tips (e.g. 1. Tip one, 2. Tip two, 3. Tip three).
      2. DO NOT use asterisks (*) anywhere in the response.
      3. DO NOT use markdown bolding or bullets.
      4. Output only plain text.
      5. Keep it very concise (under 120 words).
      6. Address the user by name if provided: ${profile.name}.

      User Profile:
      - Name: ${profile.name}
      - Age: ${profile.age}
      - Weight: ${profile.weight}kg
      - Height: ${profile.height}cm
      - Goal: ${profile.goal}
      - Activity: ${profile.activityLevel}
      - Location: ${profile.country}

      Metrics:
      - BMI: ${metrics.bmi} (${metrics.bmiCategory})
      - TDEE: ${metrics.tdee} kcal
      - Macro Goals: P:${metrics.macros.protein}g, C:${metrics.macros.carbs}g, F:${metrics.macros.fats}g
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text.replace(/\*/g, '');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "1. Stay consistent with your daily calorie goal.\n2. Prioritize protein to maintain muscle mass.\n3. Drink at least 3 liters of water daily.";
  }
};

export const generateDietPlan = async (profile: UserProfile, metrics: HealthMetrics): Promise<DietPlan | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a daily diet plan for ${profile.name} who lives in ${profile.country}.
      Fitness Goal: ${profile.goal}
      Diet Preference: ${profile.dietPreference}
      Target Daily Calories: ${metrics.dailyCalories} kcal
      Target Macros: Protein ${metrics.macros.protein}g, Carbs ${metrics.macros.carbs}g, Fats ${metrics.macros.fats}g.
      
      CRITICAL INSTRUCTIONS:
      1. Use ONLY foods that are locally available, culturally common, and affordable in ${profile.country}.
      2. Ensure the meal items combined roughly meet the target calories and macros.
      3. For ${profile.country}, suggest specific traditional or common meals (e.g., if Bangladesh, use items like Hilsha, Tilapia, Atta Roti, Daal, etc. If USA, use Oats, Chicken, Avocado, etc.).
      4. Avoid expensive imported goods; focus on staples.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            breakfast: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  serving: { type: Type.STRING },
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fats: { type: Type.NUMBER },
                  category: { type: Type.STRING }
                },
                required: ["id", "name", "serving", "calories", "protein", "carbs", "fats", "category"]
              }
            },
            lunch: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  serving: { type: Type.STRING },
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fats: { type: Type.NUMBER },
                  category: { type: Type.STRING }
                },
                required: ["id", "name", "serving", "calories", "protein", "carbs", "fats", "category"]
              }
            },
            snacks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  serving: { type: Type.STRING },
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fats: { type: Type.NUMBER },
                  category: { type: Type.STRING }
                },
                required: ["id", "name", "serving", "calories", "protein", "carbs", "fats", "category"]
              }
            },
            dinner: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  serving: { type: Type.STRING },
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fats: { type: Type.NUMBER },
                  category: { type: Type.STRING }
                },
                required: ["id", "name", "serving", "calories", "protein", "carbs", "fats", "category"]
              }
            }
          },
          required: ["breakfast", "lunch", "snacks", "dinner"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating AI diet plan:", error);
    return null;
  }
};
