// Rewards.js

// Define the badges and their corresponding descriptions
const badgesData = [
    {
      id: 1,
      name: 'Carbon Warrior',
      description: 'Awarded for achieving a significantly low carbon footprint.',
      threshold: 1500, // Points required to earn this badge (you can adjust this value)
      image: 'batch-01.png',
    },
    {
      id: 2,
      name: 'Eco-Friendly Commuter',
      description: 'Awarded for using public transportation or biking for a certain number of trips.',
      threshold: 800, // Points required to earn this badge (you can adjust this value)
      image: 'batch-02.png',
    },
    {
      id: 3,
      name: 'Energy Saver',
      description: 'Awarded for consistently reducing electricity usage.',
      threshold: 500, // Points required to earn this badge (you can adjust this value)
      image: 'batch-03.png',
    },
  ];
  
  // Function to determine earned badges based on user points
  export const getEarnedBadges = (userPoints) => {
    let highestBatch = null;
    for (const batch of badgesData) {
      if (userPoints >= batch.threshold && (!highestBatch || batch.threshold > highestBatch.threshold)) {
        highestBatch = batch;
      }
    }
    return highestBatch ? [highestBatch] : [];
  };
  
  // Function to provide reward options based on user points
  export const getRewardOptions = (userPoints) => {
    // Define reward options and their corresponding points required
    const rewardOptions = [
      { id: 1, name: '10% Off Eco-Friendly Products', pointsRequired: 50 },
      { id: 2, name: 'Reusable Water Bottle', pointsRequired: 80 },
      { id: 3, name: 'Eco-Friendly Shopping Voucher', pointsRequired: 120 },
    ];
  
    return rewardOptions.filter((reward) => userPoints >= reward.pointsRequired);
  };
  