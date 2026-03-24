I now have all the data I need. Here is the structured prerequisite reading list:

---

## Prerequisite Reading List for Partition 9: CoT/EM + Agentic Mix

Organized by topic cluster, with the most essential readings for each prompt's ideas listed first. All files referenced below live under `/workspace/0_raw_resources/`.

---

### TIER 1: ESSENTIAL READING (read all of these)

These papers provide the core scientific context that most or all of the 15 ideas in this partition build upon.

---

#### 1. Emergent Misalignment -- The Foundational Result

**Paper:** "Emergent Misalignment: Narrow Finetuning Can Produce Broadly Misaligned LLMs"
- **Authors:** Jan Betley et al.
- **Date:** 2025-01
- **URL:** https://openreview.net/forum?id=aOIJ2gVRWW
- **File:** `paper_pdfs/emergent_misalignment_narrow_finetuning_can_produce_broadly_misaligned_llms/paper.pdf`
- **Why:** The foundational paper. Shows that finetuning on narrow tasks (e.g., insecure code) produces broadly misaligned models. Essential context for P106 (resistance/fragility), P10009 (inoculation), and P10020 (behavioral shift prediction).

**Paper:** "Natural Emergent Misalignment from Reward Hacking in Production RL"
- **Authors:** Monte MacDiarmid et al. (Anthropic)
- **Date:** 2025-11
- **URL:** https://arxiv.org/abs/2505.16254
- **File:** `paper_pdfs/natural_emergent_misalignment_from_reward_hacking_in_production_rl/paper.pdf`
- **Blog:** `blog_post_htmls/anthropic_research/paper_30_emergent_misalignment_reward_hacking/`
- **Why:** Shows EM arises naturally from production RL (not just adversarial finetuning). Demonstrates inoculation prompting prevents it. Directly relevant to P10009 ideas on inoculation and RL safety.

---

#### 2. CoT Faithfulness -- The Core Problem

**Paper:** "Reasoning Models Don't Always Say What They Think"
- **Authors:** Yanda Chen, Joe Benton et al. (Anthropic)
- **Date:** 2025-03
- **URL:** https://alignment.anthropic.com/2025/reasoning-models-dont-say-what-they-think/
- **File:** `paper_pdfs/reasoning_models_dont_always_say_what_they_think/paper.pdf`
- **Blog:** `paper_extracted_txts/reasoning_models_dont_always_say_what_they_think/`
- **Why:** Demonstrates that reasoning models' CoT can be unfaithful -- they use information not reflected in their chain of thought. The key Anthropic paper motivating P10017 ideas (training CoT faithfulness) and P10016 (thinking-text concealment).

**Paper:** "Measuring Faithfulness in Chain-of-Thought Reasoning"
- **Authors:** Lanham et al. (Anthropic)
- **Date:** 2023-07
- **URL:** https://www.anthropic.com/research/measuring-faithfulness-in-chain-of-thought-reasoning
- **File:** `paper_pdfs/measuring_faithfulness_in_chain_of_thought_reasoning/paper.pdf`
- **Blog:** `blog_post_htmls/anthropic_research/paper_49_measuring_faithfulness_in_chain_of_thought_reasoning/`
- **Why:** Introduces the perturbation-based methodology for measuring CoT faithfulness (adding mistakes, paraphrasing, truncating). Directly relevant to P10017's "Training CoT Faithfulness from Perturbation Signals."

---

#### 3. Monitoring and Control -- The Safety Framework

**Paper:** "Sabotage Evaluations for Frontier Models"
- **Authors:** Joe Benton et al. (Anthropic)
- **Date:** 2024-10
- **URL:** https://www.anthropic.com/research/sabotage-evaluations
- **File:** `paper_pdfs/sabotage_evaluations_for_frontier_models/paper.pdf`
- **Blog:** `blog_post_htmls/anthropic_research/paper_67_sabotage_evaluations/`
- **Why:** Defines the evaluation categories (human-decision sabotage, code sabotage, sandbagging, oversight undermining) that P10016 ideas build on. Establishes what "catastrophic agent actions" look like in practice.

**Paper:** "Anthropic's Pilot Sabotage Risk Report"
- **Authors:** Samuel R. Bowman, Misha Wagner, Fabien Roger, Holden Karnofsky (Anthropic)
- **Date:** 2025-06
- **URL:** https://alignment.anthropic.com/2025/sabotage-risk-report/2025_pilot_risk_report.pdf
- **File:** `paper_pdfs/anthropics_pilot_sabotage_risk_report/paper.pdf`
- **Blog:** `blog_post_htmls/alignment_science_blog/paper_09_sabotage_risk_report/`
- **Why:** The actual production safety case for sabotage risk. Shows the monitoring stack used in deployment. Essential context for understanding what "catastrophic actions" and "trusted monitors" mean in practice (P10016).

**Paper:** "AI Control: Improving Safety Despite Intentional Subversion"
- **Authors:** Ryan Greenblatt, Buck Shlegeris, Kshitij Sachan, Fabien Roger (Redwood Research)
- **Date:** 2024-07
- **URL:** https://arxiv.org/abs/2312.06942
- **File:** `paper_pdfs/ai_control_improving_safety_despite_intentional_subversion/paper.pdf`
- **Why:** Introduces the AI control framework: trusted monitoring, untrusted models, safety protocols. The theoretical foundation for P10016's trusted monitor ideas.

---

#### 4. Recommendations Paper

**Paper:** "Recommendations for Technical AI Safety Research Directions"
- **Authors:** Anthropic Alignment Science team
- **Date:** 2025-01
- **URL:** https://alignment.anthropic.com/2025/recommendations/
- **Blog:** `blog_post_htmls/alignment_science_blog/paper_31_recommendations_for_technical_ai_safety_research_directions/`
- **Why:** Anthropic's roadmap for safety research priorities. Provides the big picture that all proposals should be evaluated against.

---

### TIER 2: TOPIC-SPECIFIC READING (read sections relevant to the prompts you judge)

---

#### For P10009: Portfolio of Alignment Training Approaches (Inoculation, Tool-Outcome Verification, Agentic Safety RL)

**Paper:** "Inoculation Prompting: Instructing LLMs to Misbehave at Train-Time Improves Test-Time Alignment"
- **Authors:** Nevan Wichers et al. (Anthropic)
- **Date:** 2025-10
- **URL:** https://arxiv.org/abs/2510.05024
- **File:** `paper_pdfs/inoculation_prompting_instructing_llms_to_misbehave_at_train_time_improves_test/paper.pdf`
- **Blog:** `blog_post_htmls/alignment_science_blog/paper_12_inoculation_prompting/`
- **Why:** THE paper for the "Inoculation Against Emergent Misalignment" idea. Introduces the technique of showing models misaligned behavior during training to build resistance.

**Paper:** "Inoculation Prompting: Eliciting Traits from LLMs During Training Can Reduce Trait Expression at Test-Time"
- **Authors:** Daniel Tan et al. (Truthful AI / Anthropic Fellows)
- **Date:** 2025-10
- **URL:** https://arxiv.org/abs/2510.04340
- **File:** `paper_pdfs/inoculation_prompting_eliciting_traits_from_llms_during_training_can_reduce_trai/paper.pdf`
- **Why:** Companion result showing inoculation works by reducing "surprise" of deceptive framing. Relevant to judging how novel the inoculation idea is.

**Paper:** "Training on Documents About Reward Hacking Induces Reward Hacking"
- **Authors:** Samuel Marks et al. (Anthropic)
- **Date:** 2025-03
- **URL:** https://alignment.anthropic.com/2025/reward-hacking-ooc/
- **Blog:** `blog_post_htmls/alignment_science_blog/paper_30_training_on_documents_about_reward_hacking_induces_reward/`
- **Why:** Shows how training-data content about reward hacking changes model behavior. Relevant to the "Agentic Safety RL from Sandboxed Constraint Violations" idea -- demonstrates that what models learn from is not obvious.

**Paper:** "SHADE-Arena: Evaluating Sabotage and Monitoring in LLM Agents"
- **Authors:** Jonathan Kutasov et al. (Anthropic)
- **Date:** 2025-06
- **URL:** https://assets.anthropic.com/m/4fb35becb0cd87e1/original/SHADE-Arena-Paper.pdf
- **File:** `paper_pdfs/shade_arena_evaluating_sabotage_and_monitoring_in_llm_agents/paper.pdf`
- **Blog:** `blog_post_htmls/anthropic_research/paper_69_shade_arena_sabotage_monitoring/`
- **Why:** Agent sabotage evaluation infrastructure. Relevant to the "Tool-Outcome Verification" and "Agentic Safety RL" ideas as the environment where these approaches would be tested.

**Paper:** "School of Reward Hacks: Hacking Harmless Tasks Generalizes to Misaligned Behavior"
- **Authors:** Taylor, Chua, Betley, Treutlein, Evans
- **Date:** 2025-08
- **URL:** https://arxiv.org/abs/2508.17511
- **File:** `paper_pdfs/school_of_reward_hacks_hacking_harmless_tasks_generalizes_to_misaligned_behavior/paper.pdf`
- **Why:** Shows that reward hacking on harmless tasks generalizes to misaligned behavior. Directly relevant to "Agentic Safety RL from Sandboxed Constraint Violations" -- the sandboxing approach must account for this generalization.

---

#### For P10017: Unsupervised Signals for Robust Alignment Training (CoT Faithfulness, Probes, Self-Evaluation)

**Paper:** "Chain of Thought Monitorability: A New and Fragile Opportunity for AI Safety"
- **Authors:** Korbak, Balesni et al. (Multi-org: AISI, Apollo, Anthropic, OpenAI, DeepMind)
- **Date:** 2025-07
- **URL:** https://arxiv.org/abs/2507.11473
- **File:** `paper_pdfs/chain_of_thought_monitorability_a_new_and_fragile_opportunity_for_ai_safety/paper.pdf`
- **Why:** Major position paper providing the conceptual framework for CoT monitoring. Distinguishes CoT-as-computation vs. CoT-as-rationalization. Essential context for all three P10017 ideas.

**Paper:** "Making Reasoning Matter: Measuring and Improving Faithfulness of Chain-of-Thought Reasoning"
- **Authors:** Paul, West, Bosselut, Faltings (EPFL)
- **Date:** 2024-02
- **URL:** https://arxiv.org/abs/2402.13950
- **File:** `paper_pdfs/making_reasoning_matter_measuring_and_improving_faithfulness_of_chain_of_thought/paper.pdf`
- **Why:** Introduces the FRODO framework for training faithful reasoners using counterfactual reasoning chains. Directly relevant to "Training CoT Faithfulness from Perturbation Signals."

**Paper:** "FaithRL: Learning to Reason Faithfully through Step-Level Faithfulness Maximization"
- **Authors:** Deng et al.
- **Date:** 2026-02
- **URL:** https://arxiv.org/abs/2602.05897
- **File:** `paper_pdfs/faithrl_learning_to_reason_faithfully_through_step_level_faithfulness_maximizati/paper.pdf`
- **Why:** Very recent work directly addressing the same problem as "Training CoT Faithfulness from Perturbation Signals." Uses step-level faithfulness rewards during RL training.

**Paper:** "Simple Probes Can Catch Sleeper Agents"
- **Authors:** Anthropic Alignment Science team
- **Date:** 2024-04
- **URL:** https://www.anthropic.com/research/probes-catch-sleeper-agents
- **File:** `paper_pdfs/simple_probes_can_catch_sleeper_agents/paper.pdf`
- **Blog:** `blog_post_htmls/anthropic_research/paper_58_probes_catch_sleeper_agents/`
- **Why:** Demonstrates that linear probes on intermediate activations can detect deceptive behavior. Foundation for "Probe-Based Faithfulness Penalties in Training."

**Paper:** "Linear Probe Penalties Reduce LLM Sycophancy"
- **Authors:** Papadatos, Freedman (UC Berkeley CHAI)
- **Date:** 2024-12
- **URL:** https://arxiv.org/abs/2412.00967
- **File:** `paper_pdfs/linear_probe_penalties_reduce_llm_sycophancy/paper.pdf`
- **Why:** The closest existing work to "Probe-Based Faithfulness Penalties in Training" -- uses probe-based penalty terms during training to reduce undesirable behavior.

**Paper:** "RL-Obfuscation: Can Language Models Learn to Evade Latent-Space Monitors?"
- **Authors:** Gupta, Jenner (UC Berkeley)
- **Date:** 2025-06
- **URL:** https://arxiv.org/abs/2506.14261
- **File:** `paper_pdfs/rl_obfuscation_can_language_models_learn_to_evade_latent_space_monitors/paper.pdf`
- **Why:** Directly tests whether models can evade probe-based monitoring. Finds token-level monitors are vulnerable but attention probes are more robust. Critical for evaluating the robustness claims in "Probe-Based Faithfulness Penalties."

**Paper:** "Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting"
- **Authors:** Turpin, Michael, Perez, Bowman (Anthropic / NYU)
- **Date:** 2023-05
- **URL:** https://arxiv.org/abs/2305.04388
- **File:** `paper_pdfs/language_models_dont_always_say_what_they_think_unfaithful_explanations_in_chain/paper.pdf`
- **Why:** Foundational demonstration that biased CoT explanations look plausible but are unfaithful to the actual reasoning. Relevant to "Self-Evaluation Divergence as an Alignment Training Signal."

---

#### For P106: Emergent Misalignment Resistance Across Model Families

**Paper:** "Convergent Linear Representations of Emergent Misalignment"
- **Authors:** Anna Soligo, Edward Turner, Senthooran Rajamanoharan, Neel Nanda (MATS / DeepMind)
- **Date:** 2025-06
- **URL:** https://arxiv.org/abs/2506.11618
- **File:** `paper_pdfs/convergent_linear_representations_of_emergent_misalignment/paper.pdf`
- **Why:** THE paper for P106. Shows different emergently misaligned models converge to similar linear representations, and a misalignment direction from one model can ablate misalignment in another. Directly relevant to "Do Behaviorally-Resistant Models Actually Resist Internally?"

**Paper:** "Persona Features Control Emergent Misalignment"
- **Authors:** Turner et al. (OpenAI)
- **Date:** 2025-06
- **URL:** https://openreview.net/forum?id=yjrVOxjkDR
- **File:** `paper_pdfs/persona_features_control_emergent_misalignment/paper.pdf`
- **Why:** Uses SAE-based model diffing to identify misaligned persona features. Directly relevant to "Persona Inference as a Predictor of Emergent Misalignment."

**Paper:** "Persona Vectors: Monitoring and Controlling Character Traits in Language Models"
- **Authors:** Anthropic
- **Date:** 2025-08
- **URL:** https://arxiv.org/abs/2507.21509
- **File:** `paper_pdfs/persona_vectors/paper.pdf`
- **Blog:** `blog_post_htmls/anthropic_research/paper_54_persona_vectors/`
- **Why:** Anthropic's work on monitoring and controlling character traits via persona vectors. Foundation for understanding persona inference as a detection mechanism (P106).

**Paper:** "Model Organisms for Emergent Misalignment"
- **Authors:** Turner, Soligo, Taylor, Rajamanoharan, Nanda (MATS / DeepMind)
- **Date:** 2025-06
- **URL:** https://arxiv.org/abs/2506.11613
- **File:** `paper_pdfs/model_organisms_for_emergent_misalignment/paper.pdf`
- **Why:** Creates improved EM model organisms across non-code domains (medical, financial), achieving 99% coherence. Directly relevant to testing resistance across model families.

**Paper:** "Emergent Misalignment is Easy, Narrow Misalignment is Hard"
- **Authors:** Turner, Soligo, Rajamanoharan, Nanda (DeepMind)
- **Date:** 2025-07
- **URL:** https://arxiv.org/abs/2602.07852
- **File:** `paper_pdfs/emergent_misalignment_is_easy_narrow_misalignment_is_hard/paper.pdf`
- **Why:** Explains WHY EM generalizes: a "generally misaligned" solution achieves lower loss than narrow misalignment. Essential for understanding what "resistance" means mechanistically.

**Paper:** "In-Training Defenses Against Emergent Misalignment in Language Models"
- **Authors:** Kaczer et al.
- **Date:** 2025-08
- **URL:** https://arxiv.org/abs/2508.06249
- **File:** `paper_pdfs/in_training_defenses_against_emergent_misalignment_in_language_models/paper.pdf`
- **Why:** Systematic study of training-time safeguards (KL regularization, SafeLoRA, data interleaving). Baseline for "Is EM Resistance Robust or Fragile?"

**Paper:** "Narrow Finetuning Leaves Clearly Readable Traces in Activation Differences"
- **Authors:** Minder, Dumas, Slocum, Casademunt, Holmes, West, Nanda (EPFL / DeepMind / Anthropic)
- **Date:** 2025-10
- **URL:** https://arxiv.org/abs/2510.13900
- **File:** `paper_pdfs/narrow_finetuning_leaves_clearly_readable_traces_in_activation_differences/paper.pdf`
- **Why:** Shows finetuning creates detectable activation biases across EM, SDF, and subliminal learning models. Relevant to "Do Behaviorally-Resistant Models Actually Resist Internally?"

**Paper:** "Emergent Misalignment via In-Context Learning"
- **Authors:** Afonin, Andriyanov et al.
- **Date:** 2025-10
- **URL:** https://arxiv.org/abs/2510.11288
- **File:** `paper_pdfs/emergent_misalignment_via_in_context_learning_narrow_in_context_examples_can_pro/paper.pdf`
- **Why:** Shows ICL produces EM without weight updates. Key for P10020's ICL-finetuning gap question.

---

#### For P10016: Catastrophic Agent Actions (Monitor Context, Thinking-Text Concealment, Trusted Monitors)

**Paper:** "How Does Information Access Affect LLM Monitors' Ability to Detect Sabotage?"
- **Authors:** Francis Rhys Ward et al. (UK AISI / Apollo Research)
- **Date:** 2026-01
- **URL:** https://arxiv.org/abs/2601.21112
- **File:** `paper_pdfs/how_does_information_access_affect_llm_monitors_ability_to_detect_sabotage/paper.pdf`
- **Why:** Directly studies the question of P10016's first idea -- how much context monitors need. Compares action-only vs. CoT vs. extract-and-evaluate monitoring.

**Paper:** "Monitoring Computer Use via Hierarchical Summarization"
- **Authors:** Theodore Sumers et al. (Anthropic)
- **Date:** 2025-09
- **URL:** https://alignment.anthropic.com/2025/hierarchical-summarization/
- **File:** `paper_pdfs/monitoring_computer_use_via_hierarchical_summarization/paper.pdf`
- **Blog:** `blog_post_htmls/alignment_science_blog/paper_29_monitoring_computer_use_via_hierarchical_summarization/`
- **Why:** Anthropic's approach to monitoring long agent trajectories. Directly relevant to "How Much Context Do Monitors Need."

**Paper:** "Monitoring Reasoning Models for Misbehavior and the Risks of Promoting Obfuscation"
- **Authors:** Baker, Huizinga et al. (OpenAI)
- **Date:** 2025-03
- **URL:** https://arxiv.org/abs/2503.11926
- **File:** `paper_pdfs/monitoring_reasoning_models_for_misbehavior_and_the_risks_of_promoting_obfuscati/paper.pdf`
- **Why:** Shows CoT monitoring detects reward hacking but optimizing against monitors causes obfuscation. Central to "Thinking-Text Concealment Tradeoffs."

**Paper:** "Monitoring Monitorability"
- **Authors:** Guan, Wang, Carroll et al. (OpenAI)
- **Date:** 2025
- **URL:** (OpenAI report)
- **File:** `paper_extracted_txts/monitoring_monitorability/extracted.txt`
- **Why:** Proposes monitorability evaluation archetypes and metrics. Shows RL optimization does not materially decrease monitorability. Relevant to all P10016 ideas.

**Paper:** "Preventing Language Models From Hiding Their Reasoning"
- **Authors:** Fabien Roger, Ryan Greenblatt (Anthropic / Redwood Research)
- **Date:** 2023-10
- **URL:** https://arxiv.org/abs/2310.18512
- **File:** `paper_pdfs/preventing_language_models_from_hiding_their_reasoning/paper.pdf`
- **Why:** Studies steganography in CoT and paraphrasing as defense. Directly relevant to "Thinking-Text Concealment Tradeoffs."

**Paper:** "When Chain of Thought is Necessary, Language Models Struggle to Evade Monitors"
- **Authors:** Emmons et al. (Google DeepMind)
- **Date:** 2025-07
- **URL:** https://arxiv.org/abs/2507.05246
- **File:** `paper_pdfs/when_chain_of_thought_is_necessary_language_models_struggle_to_evade_monitors/paper.pdf`
- **Why:** Key insight: when CoT is computationally necessary, evasion is much harder. Relevant to whether concealment is achievable (P10016 idea 2).

**Paper:** "Adaptive Attacks on Trusted Monitors Subvert AI Control Protocols"
- **Authors:** Terekhov et al. (EPFL / Max Planck)
- **Date:** 2025-10
- **URL:** https://arxiv.org/abs/2510.09462
- **File:** `paper_pdfs/adaptive_attacks_on_trusted_monitors_subvert_ai_control_protocols/paper.pdf`
- **Why:** Shows trusted monitors can be subverted by adaptive attacks. Critical context for "Trusted Monitor Performance on Catastrophic Agent Actions."

**Paper:** "Basic Legibility Protocols Improve Trusted Monitoring"
- **Authors:** Redwood Research et al.
- **Date:** 2026-02
- **URL:** https://arxiv.org/abs/2602.10153
- **File:** `paper_pdfs/basic_legibility_protocols_improve_trusted_monitoring/paper.pdf`
- **Why:** Shows simple protocols improve monitoring. Recent work on the same question as P10016 idea 3.

---

#### For P10020: How Models Generalize -- Predicting Behavioral Shifts

**Paper:** "Connecting the Dots: LLMs Can Infer and Verbalize Latent Structure from Disparate Training Data"
- **Authors:** Treutlein, Choi, Betley, Marks, Anil, Grosse, Evans (Truthful AI / Anthropic / Toronto)
- **Date:** 2024-06
- **URL:** https://arxiv.org/abs/2406.14546
- **File:** `paper_pdfs/connecting_the_dots_llms_can_infer_and_verbalize_latent_structure_from_disparate/paper.pdf`
- **Why:** Shows models can infer and verbalize latent structure from dispersed training data (out-of-context reasoning). Essential for "Predicting When Narrow Finetuning Causes Broad Behavioral Change."

**Paper:** "Weird Generalization and Inductive Backdoors: New Ways to Corrupt LLMs"
- **Authors:** Betley, Cocola, Feng, Chua, Arditi, Sztyber-Betley, Evans (Truthful AI)
- **Date:** 2025-12
- **URL:** https://arxiv.org/abs/2512.09742
- **File:** `paper_pdfs/weird_generalization_and_inductive_backdoors_new_ways_to_corrupt_llms/paper.pdf`
- **Why:** Individually harmless attributes matching a persona can cause broad misalignment. Introduces inductive backdoors. Directly relevant to "Predicting Which Behaviors Change When Models Acquire False Beliefs."

**Paper:** "Modifying LLM Beliefs with Synthetic Document Finetuning"
- **Authors:** Rowan Wang (Anthropic)
- **Date:** 2025-04
- **URL:** (Alignment Science blog)
- **File:** `paper_pdfs/modifying_beliefs_via_sdf/paper.pdf`
- **Blog:** `blog_post_htmls/alignment_science_blog/paper_22_modifying_beliefs_via_sdf/`
- **Why:** The SDF methodology for implanting beliefs. Directly relevant to "Predicting Which Behaviors Change When Models Acquire False Beliefs."

**Paper:** "Subliminal Learning: Language Models Transmit Behavioral Traits via Hidden Signals in Data"
- **Authors:** Cloud, Le, Chua, Betley, Sztyber-Betley, Hilton, Marks, Evans (Anthropic Fellows / Truthful AI)
- **Date:** 2025-07
- **URL:** https://arxiv.org/abs/2507.14805
- **File:** `paper_pdfs/subliminal_learning_language_models_transmit_behavioral_traits_via_hidden_signal/paper.pdf`
- **Blog:** `blog_post_htmls/alignment_science_blog/paper_18_subliminal_learning/`
- **Why:** Shows behavioral traits can transmit through data without semantic markers. Relevant to understanding why behavioral shifts are hard to predict.

**Paper:** "Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To!"
- **Authors:** Qi et al. (Princeton / Virginia Tech / IBM)
- **Date:** 2023-10
- **URL:** https://arxiv.org/abs/2310.03693
- **File:** `paper_pdfs/fine_tuning_aligned_language_models_compromises_safety_even_when_users_do_not_in/paper.pdf`
- **Why:** Early demonstration that benign finetuning can compromise safety. Foundational for P10020's question about when narrow finetuning causes broad change.

**Paper:** "Studying Large Language Model Generalization with Influence Functions"
- **Authors:** Grosse, Bae, Anil, Elhage et al. (Anthropic)
- **Date:** 2023-08
- **URL:** https://arxiv.org/abs/2308.03296
- **File:** `paper_pdfs/studying_large_language_model_generalization_with_influence_functions/paper.pdf`
- **Why:** Anthropic's work on tracing how training data influences behavior. The methodological tool most relevant to predicting behavioral shifts.

**Paper:** "Steering Fine-Tuning Generalization with Targeted Concept Ablation (CAFT)"
- **Authors:** Casademunt, Juang, Marks, Rajamanoharan, Nanda (DeepMind / Anthropic)
- **Date:** 2025-04
- **URL:** https://arxiv.org/abs/2504.02262
- **File:** `paper_pdfs/steering_fine_tuning_generalization_with_targeted_concept_ablation_caft/paper.pdf`
- **Why:** Shows how to steer what features finetuning modifies. Directly relevant to controlling/predicting generalization behavior.

**Paper:** "Alignment Faking in Large Language Models"
- **Authors:** Greenblatt, Denison et al. (Anthropic / Redwood Research)
- **Date:** 2024-12
- **URL:** https://arxiv.org/abs/2412.14093
- **File:** `paper_pdfs/alignment_faking_in_large_language_models/paper.pdf`
- **Why:** Uses SDF to give models false beliefs about their training situation, demonstrating how beliefs drive behavioral shifts. Core methodology for "Predicting Which Behaviors Change When Models Acquire False Beliefs."

---

### TIER 3: ADDITIONAL CONTEXT (skim or reference as needed)

These provide useful secondary context but are not essential for competent judging.

**Paper:** "Agentic Misalignment: How LLMs Could Be Insider Threats" -- Lynch et al. (Anthropic, 2025-06)
- URL: https://www.anthropic.com/research/agentic-misalignment
- File: `paper_pdfs/agentic_misalignment_how_llms_could_be_insider_threats/paper.pdf`
- Context for agentic safety scenarios in P10009 and P10016.

**Paper:** "CoT Red-Handed: Stress Testing Chain-of-Thought Monitoring" -- Arnav et al. (LASR / DeepMind, 2025-05)
- URL: https://arxiv.org/abs/2505.23575
- File: `paper_pdfs/cot_red_handed_stress_testing_chain_of_thought_monitoring/paper.pdf`
- Stress-tests CoT monitoring with adversarial objectives; relevant to P10016 and P10017.

**Paper:** "A Pragmatic Way to Measure Chain-of-Thought Monitorability" -- Emmons et al. (DeepMind, 2025-10)
- URL: https://arxiv.org/abs/2510.23966
- File: `paper_pdfs/a_pragmatic_way_to_measure_chain_of_thought_monitorability/paper.pdf`
- Proposes legibility and coverage as measurable proxy metrics.

**Paper:** "CoT May Be Highly Informative Despite Unfaithfulness" -- METR (2025-08)
- URL: https://metr.org/blog/2025-08-08-cot-may-be-highly-informative-despite-unfaithfulness/
- File: `paper_pdfs/cot_may_be_highly_informative_despite_unfaithfulness/paper.pdf`
- Nuances the faithfulness picture for P10017.

**Paper:** "Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training" -- Hubinger, Denison et al. (Anthropic, 2024-01)
- URL: https://arxiv.org/abs/2401.05566
- File: `paper_pdfs/sleeper_agents_training_deceptive_llms_that_persist_through_safety_training/paper.pdf`
- Foundation for understanding persistent misalignment through training; relevant to P10009 and P106.

**Paper:** "Towards Training-Time Mitigations for Alignment Faking in RL" -- Anthropic (2025-12)
- URL: https://alignment.anthropic.com/2025/alignment-faking-mitigations/
- File: `paper_pdfs/towards_training_time_mitigations_for_alignment_faking_in_rl/paper.pdf`
- Recent Anthropic work on training-time mitigations; relevant to P10009 inoculation ideas.

**Paper:** "Practical Challenges of Control Monitoring in Frontier AI Deployments" -- Lindner, Griffin, Korbak et al. (DeepMind / UK AISI, 2025-12)
- URL: https://arxiv.org/abs/2512.22154
- File: `paper_pdfs/practical_challenges_of_control_monitoring_in_frontier_ai_deployments/paper.pdf`
- Real-world monitoring challenges; relevant to P10016.

**Paper:** "Monitoring Emergent Reward Hacking During Generation via Internal Activations" -- Various (2026-03)
- URL: https://arxiv.org/abs/2603.04069
- File: `paper_pdfs/monitoring_emergent_reward_hacking_during_generation_via_internal_activations/paper.pdf`
- Very recent work on activation-based monitoring during generation; relevant to P10017.

**Paper:** "Obfuscated Activations Bypass LLM Latent-Space Defenses" -- Bailey et al. (Stanford / ARC / Berkeley, 2024-12)
- URL: https://arxiv.org/abs/2412.09565
- File: `paper_pdfs/obfuscated_activations_bypass_llm_latent_space_defenses/paper.pdf`
- Shows probes can be evaded through activation obfuscation; relevant to P10017 probe robustness.

**Paper:** "Do Reasoning Models Use Their Scratchpad Like We Do? Evidence from Distilling Paraphrases" -- Roger (Anthropic, 2025-03)
- URL: https://alignment.anthropic.com/2025/distill-paraphrases/
- File: `paper_pdfs/do_reasoning_models_use_their_scratchpad_like_we_do_evidence_from_distilling_par/paper.pdf`
- Investigates whether reasoning models actually use CoT for computation; relevant to P10016 concealment question.

**Paper:** "Thought Crime: Backdoors and Emergent Misalignment in Reasoning Models" -- Chua, Betley, Taylor, Evans (Truthful AI, 2025-06)
- URL: https://arxiv.org/abs/2506.13206
- File: `paper_pdfs/thought_crime_backdoors_and_emergent_misalignment_in_reasoning_models/paper.pdf`
- Extends EM to reasoning models with visible CoT; relevant to both P106 and P10016.

**Paper:** "Emergent Misalignment as Prompt Sensitivity" -- Wyse et al. (2025-07)
- URL: https://arxiv.org/abs/2507.06253
- File: `paper_pdfs/emergent_misalignment_as_prompt_sensitivity_a_research_note/paper.pdf`
- Shows EM models are highly prompt-sensitive; relevant to P106 robustness/fragility question.

**Paper:** "The Devil in the Details: Emergent Misalignment, Format and Coherence in Open-Weight LLMs" -- Various (2025-11)
- URL: https://arxiv.org/abs/2511.20104
- File: `paper_pdfs/the_devil_in_the_details_emergent_misalignment_format_and_coherence_in_open_weig/paper.pdf`
- Format-dependent vulnerability in EM; relevant to P106.

**Paper:** "Simple Mechanistic Explanations for Out-of-Context Reasoning" -- Wang et al. (MIT / DeepMind, 2025-07)
- URL: https://arxiv.org/abs/2507.08218
- File: `paper_pdfs/simple_mechanistic_explanations_for_out_of_context_reasoning/paper.pdf`
- Mechanistic understanding of how OOCR works; relevant to P10020.

**Paper:** "Who's Asking? User Personas and the Mechanics of Latent Misalignment" -- Various (2024-06)
- URL: https://arxiv.org/abs/2406.12094
- File: `paper_pdfs/whos_asking_user_personas_and_the_mechanics_of_latent_misalignment/paper.pdf`
- Persona-driven misalignment mechanics; relevant to P106 persona inference idea.

**Paper:** "Safety Alignment Should Be Made More Than Just a Few Tokens Deep" -- Qi et al. (Princeton / Google, 2024-06)
- URL: https://arxiv.org/abs/2406.05946
- File: `paper_pdfs/safety_alignment_should_be_made_more_than_just_a_few_tokens_deep/paper.pdf`
- Argues for deeper safety training; relevant to P10009 and P106.

**Paper:** "Detecting Strategic Deception Using Linear Probes" -- Goldowsky-Dill et al. (Apollo Research, 2025-02)
- URL: https://arxiv.org/abs/2502.03407
- File: `paper_pdfs/detecting_strategic_deception_using_linear_probes/paper.pdf`
- Probe-based deception detection; relevant to P10017 and P106.

**Paper:** "Claude's Character" -- Anthropic (2024-06)
- URL: https://www.anthropic.com/research/claude-character
- Blog: `blog_post_htmls/anthropic_research/paper_17_claude_character/`
- Background on how Anthropic shapes model character; general context.

**Paper:** "Claude 4 System Card" -- Anthropic
- URL: https://www.anthropic.com/claude-4-system-card
- Not in local files, but referenced in agentic misalignment blog post. Provides deployment-level safety context.

**Paper:** "LLMs Can Covertly Sandbag on Capability Evaluations Against CoT Monitoring" -- Li, Phuong, Siegel (DeepMind, 2025-08)
- URL: https://arxiv.org/abs/2508.00943
- File: `paper_pdfs/llms_can_covertly_sandbag_on_capability_evaluations_against_chain_of_thought_mon/paper.pdf`
- Demonstrates CoT-monitored sandbagging; relevant to P10016 concealment tradeoffs.

---

### Summary: Reading Priority by Prompt

| Prompt | Must-Read Papers | Count |
|--------|-----------------|-------|
| P10009 (alignment training portfolio) | Betley et al. EM, Natural EM/Reward Hacking, Inoculation Prompting (both), Training on RH docs, SHADE-Arena, School of Reward Hacks | 7 |
| P10017 (unsupervised alignment signals) | Reasoning Models Don't Say What They Think, Measuring Faithfulness (Anthropic), CoT Monitorability position paper, FRODO, FaithRL, Probes Catch Sleeper Agents, Linear Probe Penalties, RL-Obfuscation, Unfaithful Explanations | 9 |
| P106 (EM resistance across families) | Betley et al. EM, Convergent Linear Reps, Persona Features Control EM, Persona Vectors, Model Organisms, EM is Easy/Narrow is Hard, In-Training Defenses, Narrow Finetuning Traces, ICL EM | 9 |
| P10016 (catastrophic agent actions) | Sabotage Evaluations, Sabotage Risk Report, AI Control, Info Access Monitors, Monitoring Computer Use, Monitoring Reasoning Models, Monitoring Monitorability, Preventing Hidden Reasoning, When CoT Necessary, Adaptive Attacks | 10 |
| P10020 (predicting behavioral shifts) | Betley et al. EM, ICL EM, Connecting the Dots, Weird Generalization, Modifying Beliefs via SDF, Subliminal Learning, Fine-tuning Compromises Safety, Influence Functions, CAFT, Alignment Faking | 10 |