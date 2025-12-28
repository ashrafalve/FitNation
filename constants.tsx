
import { FitnessGoal, ActivityLevel, FoodItem, WorkoutExercise } from './types';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHT]: 1.375,
  [ActivityLevel.MODERATE]: 1.55,
  [ActivityLevel.VERY_ACTIVE]: 1.725,
  [ActivityLevel.EXTRA_ACTIVE]: 1.9,
};

export const ALLOWED_COUNTRIES = [
  'Bangladesh', 'India', 'Pakistan', 'USA', 'Canada', 'UAE', 'China', 
  'Sri Lanka', 'UK', 'Australia', 'Germany', 'Japan', 'Saudi Arabia', 
  'Singapore', 'France', 'Italy', 'Brazil'
];

// Region Mapping
const COUNTRY_TO_REGION: Record<string, string> = {
  'Bangladesh': 'SOUTH_ASIA',
  'India': 'SOUTH_ASIA',
  'Pakistan': 'SOUTH_ASIA',
  'Sri Lanka': 'SOUTH_ASIA',
  'USA': 'WESTERN',
  'Canada': 'WESTERN',
  'UK': 'WESTERN',
  'Australia': 'WESTERN',
  'Germany': 'WESTERN',
  'France': 'WESTERN',
  'Italy': 'WESTERN',
  'Brazil': 'WESTERN',
  'UAE': 'MIDDLE_EAST',
  'Saudi Arabia': 'MIDDLE_EAST',
  'China': 'EAST_ASIA',
  'Japan': 'EAST_ASIA',
  'Singapore': 'EAST_ASIA',
};

export const getRegionForCountry = (country: string) => COUNTRY_TO_REGION[country] || 'GLOBAL';

export const MASTER_FOOD_LIBRARY: FoodItem[] = [
  // SOUTH ASIA (BD, India, PK, SL)
  { id: 'sa-rice-1', name: 'Basmati Rice', serving: '1 cup', calories: 210, protein: 4.5, carbs: 46, fats: 0.5, category: 'carb', regions: ['SOUTH_ASIA'] },
  { id: 'sa-roti-1', name: 'Whole Wheat Roti', serving: '1 medium', calories: 110, protein: 4, carbs: 22, fats: 0.4, category: 'carb', regions: ['SOUTH_ASIA'] },
  { id: 'sa-dal-1', name: 'Masoor Dal', serving: '1 cup', calories: 230, protein: 18, carbs: 40, fats: 1, category: 'protein', regions: ['SOUTH_ASIA'] },
  { id: 'sa-paneer-1', name: 'Paneer Curry', serving: '100g', calories: 260, protein: 18, carbs: 4, fats: 20, category: 'protein', regions: ['SOUTH_ASIA'] },
  { id: 'sa-chicken-1', name: 'Chicken Bhuna', serving: '100g', calories: 170, protein: 28, carbs: 2, fats: 6, category: 'protein', regions: ['SOUTH_ASIA'] },
  { id: 'sa-fish-1', name: 'River Fish Curry', serving: '100g', calories: 140, protein: 22, carbs: 0, fats: 5, category: 'protein', regions: ['SOUTH_ASIA'] },
  { id: 'sa-veg-1', name: 'Aloo Gobi', serving: '1 cup', calories: 120, protein: 3, carbs: 18, fats: 5, category: 'veg', regions: ['SOUTH_ASIA'] },
  { id: 'sa-veg-2', name: 'Palak Paneer', serving: '1 cup', calories: 190, protein: 12, carbs: 8, fats: 14, category: 'veg', regions: ['SOUTH_ASIA'] },
  { id: 'sa-fruit-1', name: 'Mango', serving: '1 medium', calories: 150, protein: 1, carbs: 35, fats: 0.5, category: 'fruit', regions: ['SOUTH_ASIA'] },

  // WESTERN (USA, Canada, UK, EU, AU)
  { id: 'we-oats-1', name: 'Rolled Oats', serving: '1 cup', calories: 160, protein: 6, carbs: 28, fats: 3, category: 'carb', regions: ['WESTERN'] },
  { id: 'we-bread-1', name: 'Sourdough Bread', serving: '2 slices', calories: 180, protein: 8, carbs: 36, fats: 1, category: 'carb', regions: ['WESTERN'] },
  { id: 'we-pasta-1', name: 'Spaghetti', serving: '1 cup', calories: 220, protein: 8, carbs: 43, fats: 1.3, category: 'carb', regions: ['WESTERN'] },
  { id: 'we-chicken-1', name: 'Grilled Chicken Breast', serving: '100g', calories: 165, protein: 31, carbs: 0, fats: 3.6, category: 'protein', regions: ['WESTERN', 'GLOBAL'] },
  { id: 'we-beef-1', name: 'Lean Ground Beef', serving: '100g', calories: 250, protein: 26, carbs: 0, fats: 15, category: 'protein', regions: ['WESTERN'] },
  { id: 'we-salmon-1', name: 'Baked Salmon', serving: '100g', calories: 200, protein: 22, carbs: 0, fats: 12, category: 'protein', regions: ['WESTERN'] },
  { id: 'we-veg-1', name: 'Steamed Broccoli', serving: '1 cup', calories: 55, protein: 4, carbs: 11, fats: 0.6, category: 'veg', regions: ['WESTERN', 'GLOBAL'] },
  { id: 'we-veg-2', name: 'Mixed Greens Salad', serving: '2 cups', calories: 40, protein: 2, carbs: 6, fats: 1, category: 'veg', regions: ['WESTERN', 'GLOBAL'] },
  { id: 'we-fruit-1', name: 'Blueberries', serving: '1 cup', calories: 85, protein: 1, carbs: 21, fats: 0.5, category: 'fruit', regions: ['WESTERN'] },

  // MIDDLE EAST (UAE, SA)
  { id: 'me-pita-1', name: 'Pita Bread', serving: '1 large', calories: 165, protein: 5, carbs: 33, fats: 1, category: 'carb', regions: ['MIDDLE_EAST'] },
  { id: 'me-hummus-1', name: 'Hummus', serving: '0.25 cup', calories: 100, protein: 5, carbs: 10, fats: 6, category: 'protein', regions: ['MIDDLE_EAST'] },
  { id: 'me-lamb-1', name: 'Lamb Kebab', serving: '100g', calories: 230, protein: 24, carbs: 1, fats: 14, category: 'protein', regions: ['MIDDLE_EAST'] },
  { id: 'me-veg-1', name: 'Tabbouleh', serving: '1 cup', calories: 140, protein: 3, carbs: 15, fats: 9, category: 'veg', regions: ['MIDDLE_EAST'] },
  { id: 'me-fruit-1', name: 'Dates', serving: '3 pieces', calories: 200, protein: 1.5, carbs: 54, fats: 0.3, category: 'fruit', regions: ['MIDDLE_EAST'] },

  // EAST ASIA (China, Japan, Singapore)
  { id: 'ea-rice-1', name: 'Jasmine Rice', serving: '1 cup', calories: 205, protein: 4, carbs: 45, fats: 0.4, category: 'carb', regions: ['EAST_ASIA'] },
  { id: 'ea-noodles-1', name: 'Egg Noodles', serving: '1 cup', calories: 220, protein: 7, carbs: 40, fats: 3, category: 'carb', regions: ['EAST_ASIA'] },
  { id: 'ea-tofu-1', name: 'Steamed Tofu', serving: '100g', calories: 80, protein: 8, carbs: 2, fats: 5, category: 'protein', regions: ['EAST_ASIA', 'GLOBAL'] },
  { id: 'ea-chicken-1', name: 'Stir-fry Chicken', serving: '100g', calories: 180, protein: 25, carbs: 5, fats: 7, category: 'protein', regions: ['EAST_ASIA'] },
  { id: 'ea-veg-1', name: 'Bok Choy', serving: '1 cup', calories: 20, protein: 2, carbs: 3, fats: 0.2, category: 'veg', regions: ['EAST_ASIA'] },
  { id: 'ea-fruit-1', name: 'Lychee', serving: '10 pieces', calories: 65, protein: 1, carbs: 16, fats: 0.4, category: 'fruit', regions: ['EAST_ASIA'] },

  // GLOBAL / ALWAYS AVAILABLE
  { id: 'gl-egg-1', name: 'Boiled Egg', serving: '1 large', calories: 78, protein: 6, carbs: 0.6, fats: 5, category: 'protein', regions: ['GLOBAL', 'SOUTH_ASIA', 'WESTERN', 'MIDDLE_EAST', 'EAST_ASIA'] },
  { id: 'gl-banana-1', name: 'Banana', serving: '1 medium', calories: 105, protein: 1.3, carbs: 27, fats: 0.3, category: 'fruit', regions: ['GLOBAL', 'SOUTH_ASIA', 'WESTERN', 'MIDDLE_EAST', 'EAST_ASIA'] },
  { id: 'gl-apple-1', name: 'Apple', serving: '1 medium', calories: 95, protein: 0.5, carbs: 25, fats: 0.3, category: 'fruit', regions: ['GLOBAL', 'SOUTH_ASIA', 'WESTERN', 'MIDDLE_EAST', 'EAST_ASIA'] },
];

export const WORKOUT_LIBRARY: Record<FitnessGoal, { warmup: WorkoutExercise[], main: WorkoutExercise[], cooldown: WorkoutExercise[] }> = {
  [FitnessGoal.SIX_PACK]: {
    warmup: [
      { name: 'Jumping Jacks', sets: 2, reps: '30 sec', rest: '15 sec' },
      { name: 'Cat-Cow Stretch', sets: 1, reps: '10 reps', rest: '0 sec' }
    ],
    main: [
      { name: 'Bicycle Crunches', sets: 4, reps: '20 reps', rest: '30 sec' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '12-15 reps', rest: '45 sec' },
      { name: 'Plank', sets: 3, reps: '60 sec', rest: '45 sec' },
      { name: 'Russian Twists', sets: 3, reps: '30 reps', rest: '30 sec' }
    ],
    cooldown: [
      { name: 'Cobra Stretch', sets: 1, reps: '30 sec', rest: '0 sec' },
      { name: 'Child\'s Pose', sets: 1, reps: '30 sec', rest: '0 sec' }
    ]
  },
  [FitnessGoal.FAT_LOSS]: {
    warmup: [{ name: 'Light Jog', sets: 1, reps: '5 min', rest: '0 sec' }],
    main: [
      { name: 'Burpees', sets: 4, reps: '15 reps', rest: '60 sec' },
      { name: 'Bodyweight Squats', sets: 4, reps: '20 reps', rest: '45 sec' },
      { name: 'Mountain Climbers', sets: 3, reps: '45 sec', rest: '30 sec' },
      { name: 'Pushups', sets: 3, reps: 'Max effort', rest: '60 sec' }
    ],
    cooldown: [{ name: 'Full Body Static Stretch', sets: 1, reps: '5 min', rest: '0 sec' }]
  },
  [FitnessGoal.MUSCLE_GAIN]: {
    warmup: [{ name: 'Dynamic Shoulder Rotations', sets: 2, reps: '15 reps', rest: '15 sec' }],
    main: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-12 reps', rest: '90 sec' },
      { name: 'Barbell Squat', sets: 4, reps: '8-12 reps', rest: '90 sec' },
      { name: 'Deadlift', sets: 3, reps: '5-8 reps', rest: '120 sec' },
      { name: 'Pull-ups', sets: 3, reps: 'To failure', rest: '90 sec' }
    ],
    cooldown: [{ name: 'Foam Rolling', sets: 1, reps: '5 min', rest: '0 sec' }]
  },
  [FitnessGoal.STRENGTH]: {
    warmup: [{ name: 'Joint Mobility Drill', sets: 1, reps: '5 min', rest: '0 sec' }],
    main: [
      { name: 'Heavy Bench Press', sets: 5, reps: '5 reps', rest: '180 sec' },
      { name: 'Heavy Squat', sets: 5, reps: '5 reps', rest: '180 sec' },
      { name: 'Overhead Press', sets: 5, reps: '5 reps', rest: '120 sec' }
    ],
    cooldown: [{ name: 'Deep Breathing', sets: 1, reps: '3 min', rest: '0 sec' }]
  },
  [FitnessGoal.GENERAL_FITNESS]: {
    warmup: [{ name: 'Brisk Walk', sets: 1, reps: '10 min', rest: '0 sec' }],
    main: [
      { name: 'Swimming or Cycling', sets: 1, reps: '30 min', rest: '0 sec' },
      { name: 'Bodyweight Lunges', sets: 3, reps: '12 reps', rest: '30 sec' },
      { name: 'Incline Pushups', sets: 3, reps: '15 reps', rest: '30 sec' }
    ],
    cooldown: [{ name: 'Gentle Yoga Stretches', sets: 1, reps: '10 min', rest: '0 sec' }]
  }
};
