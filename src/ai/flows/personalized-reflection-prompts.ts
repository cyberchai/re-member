'use server';

/**
 * @fileOverview Generates personalized reflection prompts for a selected body part.
 *
 * - generateReflectionPrompts - A function that generates reflection prompts.
 * - ReflectionPromptsInput - The input type for the generateReflectionPrompts function.
 * - ReflectionPromptsOutput - The return type for the generateReflectionPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReflectionPromptsInputSchema = z.object({
  bodyPart: z.string().describe('The body part selected by the user.'),
});
export type ReflectionPromptsInput = z.infer<typeof ReflectionPromptsInputSchema>;

const ReflectionPromptsOutputSchema = z.object({
  prompts: z.array(z.string()).describe('An array of personalized reflection prompts.'),
});
export type ReflectionPromptsOutput = z.infer<typeof ReflectionPromptsOutputSchema>;

export async function generateReflectionPrompts(
  input: ReflectionPromptsInput
): Promise<ReflectionPromptsOutput> {
  return reflectionPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reflectionPromptsPrompt',
  input: {schema: ReflectionPromptsInputSchema},
  output: {schema: ReflectionPromptsOutputSchema},
  prompt: `You are a compassionate and insightful guide, helping users explore their memories and emotional associations related to specific body parts.

  Generate three thoughtful and open-ended reflection prompts for the following body part:

  {{bodyPart}}

  The prompts should encourage deep introspection and personal storytelling. Format the prompts as an array of strings.
  `,
});

const reflectionPromptsFlow = ai.defineFlow(
  {
    name: 'reflectionPromptsFlow',
    inputSchema: ReflectionPromptsInputSchema,
    outputSchema: ReflectionPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
