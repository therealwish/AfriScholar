export type Guide = {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  content: string;
};

export const allGuides: Guide[] = [
  {
    id: "find-business-idea",
    title: "How to find a business idea",
    summary: "Stop chasing trends. Learn how to spot real problems in your community and build a solution people will actually pay for.",
    readTime: "3 min read",
    content: `The best businesses do not start with a brilliant idea. They start with a frustrating problem.

Look around your community. What is broken? What takes too long? What is too expensive? 
Here is how you validate an idea before spending a single dollar:

1. Talk to 10 people
Do not ask your friends if they like your idea. Ask strangers about their problems. "What is the hardest part about buying fresh vegetables in this neighborhood?"

2. The "Would you pay for it?" test
If you describe your solution, would they pay for it right now? If the answer is "maybe" or "that's cool", it is not a business. If they ask "where can I buy it?", you have a business.

3. Start small
Do not build an app. Do not rent a store. If you want to sell clothes, buy 5 items and try to sell them on WhatsApp. If they sell, buy 10. That is how you validate without going into debt.`
  },
  {
    id: "one-page-business-plan",
    title: "The 1-Page Business Plan",
    summary: "Investors and grant funders do not want a 50-page document. They want clarity. Here is the exact template to use.",
    readTime: "5 min read",
    content: `If you are applying for a grant or pitching a partner, they will not read a 50-page document. They want to know exactly how you plan to make money. 

Copy and paste this template into a Word document and fill it out:

1. The Problem
What specific problem are you solving? (Keep it to 2 sentences. Example: "Smallholder farmers in Zimbabwe lose 30% of their crops because they cannot afford proper storage.")

2. The Solution
How does your business fix this? (Example: "We provide affordable, solar-powered cold storage units on a pay-per-use basis.")

3. Target Market
Who is paying you? (Example: "Commercial vegetable farmers within 50km of Harare.")

4. Revenue Model
How exactly do you make money? (Example: "We charge $5 per week per farmer to store their produce.")

5. Costs and Pricing
What does it cost you to provide the service, and what is your profit margin? (Example: "It costs $2 per week in maintenance. We keep $3 as profit.")

That is it. If you can clearly explain those 5 points, you have a better plan than 90% of people applying for the same grant.`
  },
  {
    id: "pricing-your-product",
    title: "How to price your product",
    summary: "The formula for pricing that covers your costs, pays you a living wage, and still keeps customers coming back.",
    readTime: "3 min read",
    content: `Many young entrepreneurs make the mistake of pricing their products based on what their competitors charge. This is dangerous. You do not know their costs.

Here is the simple formula you should use:

Step 1: Calculate your Cost of Goods Sold (COGS)
If you sell a t-shirt, what does it cost you to buy the blank shirt, print the design, and package it? Let's say it is $10.

Step 2: Add your margin
This is the money you keep. A standard margin for a small business is 50%. So, you take your $10 cost and add 50% ($5). Your price is now $15.

Step 3: Factor in your time and hidden costs
Did you spend 2 hours delivering the shirt? Add the cost of transport. If it cost you $2 to travel, your true cost is $12. 

Step 4: Test the price
If you charge $17, do people still buy? If yes, your price might be too low. If nobody buys, you either need to lower your cost or find a different market.`
  },
  {
    id: "selling-on-whatsapp",
    title: "Selling on WhatsApp and TikTok",
    summary: "You do not need a fancy website to start. Learn how to use the apps already on your phone to close sales today.",
    readTime: "4 min read",
    content: `You have a smartphone. That is your storefront. Here is how to use it to make sales.

WhatsApp Business:
1. Download WhatsApp Business (it is free and separate from your personal account).
2. Set up your Catalog. Upload 5 photos of your products with clear prices. 
3. Set an Away Message. If someone messages you at 2 AM, they should get a message saying, "Thanks for reaching out. I will reply at 8 AM."
4. Use Status updates. Every day, post one photo of your product being used. Do not just post the item; show a happy customer using it.

TikTok:
1. Stop trying to make viral dances. Make "how-to" videos related to your business.
2. If you sell hair products, make a video showing how to use them. 
3. Put your WhatsApp link in your bio. 
4. Reply to every comment with a video, not just text.

Consistency is more important than perfection. Posting one average photo every day will make you more money than posting one perfect photo every month.`
  },
  {
    id: "applying-for-grants",
    title: "How to apply for grants",
    summary: "Grant applications are not lotteries. Learn how to structure your proposal so funders take you seriously.",
    readTime: "4 min read",
    content: `Grants are not free money. They are investments. A funder is giving you money because they want to see a specific result in your community. 

Here is how to make your application stand out:

1. Follow the instructions exactly
If they ask for a 2-page proposal in PDF format, do not send a 5-page Word document. Failing this simple test tells the funder you will also fail to follow their rules when you receive the money.

2. Focus on Impact, not just the money
Do not just say "I need $5,000 to buy equipment." Say "I need $5,000 to buy equipment, which will allow me to train 20 young women, increasing their income by 40%."

3. Have a clear budget
If you ask for $5,000, break it down exactly:
$3,000 - Equipment
$1,000 - Training materials
$1,000 - Transport and logistics
Vague budgets look like you plan to pocket the money. Clear budgets build trust.

4. Tell a specific story
Use a real person. If you are helping farmers, tell the story of one farmer, their name, their challenge, and how your project helped them.`
  }
];