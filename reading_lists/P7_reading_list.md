Now I have a thorough understanding of all the resources. Let me compile the structured reading list.

---

# P7 Prerequisite Reading List: "Red Teaming + Alignment Training Mix"

## Cluster 1: Cyber Evaluations -- Benchmarks, Calibration, and Scalability
**Relevant to:** P34 (cyber eval calibration gap), P10003 (scalable cyber evals), P76 (benchmark-deployment divergence)

### Essential

1. **"Building AI for cyber defenders"** (Anthropic Research, Oct 2025)
   - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_09_building_ai_cyber_defenders/paper_extracted.txt`
   - Directly addresses the gap between evaluation scores (CyBench, CyberGym) and real-world cyber performance; shows how multi-trial evaluation reveals capabilities missed by single-pass testing.

2. **"CyBench: A Framework for Evaluating Cybersecurity Capabilities and Risks of Language Models"** (Stanford, ICLR 2025)
   - Path: `/workspace/0_raw_resources/paper_extracted_txts/cybench_a_framework_for_evaluating_cybersecurity_capabilities_and_risks_of_langu/extracted.txt`
   - URL: [https://arxiv.org/abs/2408.08926](https://arxiv.org/abs/2408.08926)
   - The primary open-source cyber eval framework referenced in AISI pre-deployment evaluations; 40 professional-level CTF tasks with subtask decomposition.

3. **"BountyBench: Dollar Impact of AI Agent Attackers and Defenders on Real-World Cybersecurity Systems"** (Stanford, NeurIPS 2025)
   - Path: `/workspace/0_raw_resources/paper_extracted_txts/bountybench_dollar_impact_of_ai_agent_attackers_and_defenders_on_real_world_cybe/extracted.txt`
   - URL: [https://arxiv.org/abs/2505.15216](https://arxiv.org/abs/2505.15216)
   - Advances beyond CTF to real-world codebases with Detect/Exploit/Patch lifecycle; addresses scalability and ecological validity of cyber evals.

### Recommended

4. **"A statistical approach to model evaluations"** (Anthropic, Nov 2024)
   - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_74_statistical_approach_to_model_evals/paper_extracted.txt`
   - Foundational methodology for understanding when benchmark differences are real vs. noise; directly relevant to calibration gap questions.

5. **"Challenges in evaluating AI systems"** (Anthropic, Oct 2023)
   - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_34_evaluating_ai_systems/paper_extracted.txt`
   - Comprehensive catalog of eval pitfalls (data contamination, format sensitivity, crowdworker subjectivity, third-party audit tensions); essential context for any eval-focused research.

---

## Cluster 2: CBRN / Biosecurity Evaluations and Agentic Threats
**Relevant to:** P96 (CBRN detection for agentic threats)

### Essential

6. **"The Operational Risks of AI in Large-Scale Biological Attacks: Results of a Red-Team Study"** (RAND Corporation)
   - Path: `/workspace/0_raw_resources/paper_extracted_txts/the_operational_risks_of_ai_in_large_scale_biological_attacks_results_of_a_red_t/extracted.txt`
   - Expert red-team methodology for assessing LLM uplift to biological attack planning; found no statistically significant uplift with current models but highlights monitoring needs.

7. **"Evaluating LLM Agents on Benchtop DNA Acquisition"** (RAND, 2026)
   - Path: `/workspace/0_raw_resources/paper_extracted_txts/evaluating_llm_agents_on_benchtop_dna_acquisition/extracted.txt`
   - Task-based evaluation bridging digital-to-physical CBRN threat assessment; includes simulated DNA synthesizer interactions and physical validation.

8. **"Constitutional Classifiers: Defending against universal jailbreaks"** (Anthropic, Feb 2025)
   - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_22_constitutional_classifiers/paper_extracted.txt`
   - CBRN-focused classifier defense system; demonstrates how safeguards are built specifically around CBRN content.

### Recommended

9. **"Next-generation Constitutional Classifiers"** (Anthropic, Jan 2026)
   - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_52_next_generation_constitutional_classifiers/paper_extracted.txt`
   - Reveals how reconstruction and obfuscation attacks bypass CBRN classifiers; directly relevant to understanding why safeguards diverge between benchmarks and deployment.

10. **"Beyond Data Filtering: Knowledge Localization for Capability Removal in LLMs (SGTM)"** (Alignment Science Blog, Dec 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_06_selective_gradient_masking/paper_extracted.txt`
    - Pretraining-time approach to localizing and removing CBRN knowledge; relevant to P96's question about novel approaches to controlling dangerous capabilities.

11. **Anthropic Responsible Scaling Policy (v3.0)**
    - URL: [https://www.anthropic.com/responsible-scaling-policy](https://www.anthropic.com/responsible-scaling-policy)
    - Defines ASL-3/ASL-4 CBRN capability thresholds and evaluation requirements.

12. **"Quantifying CBRN Risk in Frontier Models"** (Enkrypt AI, 2025)
    - URL: [https://arxiv.org/abs/2510.21133](https://arxiv.org/abs/2510.21133)
    - Systematic evaluation of 10 frontier LLMs across all CBRN domains with three-tier attack taxonomy.

---

## Cluster 3: Benchmark-Deployment Divergence and Safety Benchmark Validity
**Relevant to:** P76 (identical benchmark scores, different deployment behavior), P34 (calibration gap)

### Essential

13. **"On Evaluating the Durability of Safeguards for Open-Weight LLMs"** (Princeton/Google, Dec 2024)
    - Path: `/workspace/0_raw_resources/paper_extracted_txts/on_evaluating_the_durability_of_safeguards_for_open_weight_llms/extracted.txt`
    - Demonstrates how small changes in evaluation setup (dataset shuffling, trainer implementation, prompt templates) lead to drastically different safety conclusions; directly explains how identical benchmark scores can coexist with different deployment behavior.

14. **"Jailbroken: How Does LLM Safety Training Fail?"** (UC Berkeley, 2023)
    - Path: `/workspace/0_raw_resources/paper_extracted_txts/jailbroken_how_does_llm_safety_training_fail/extracted.txt`
    - Identifies two failure modes (competing objectives, mismatched generalization) that explain fundamental limits of benchmark-based safety assurance.

15. **"Won't vs. Can't: Sandbagging-like Behavior from Claude Models"** (Alignment Science Blog)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_28_wont_vs_cant/paper_extracted.txt`
    - Demonstrates that models selectively deny capabilities based on content valence, illustrating how safety benchmarks can misrepresent actual model behavior.

### Recommended

16. **"Stress-testing model specs reveals character differences among language models"** (Alignment Science Blog)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_10_stress_testing_model_specs/paper_extracted.txt`
    - Shows 220,000+ scenarios where models from different labs with similar specs diverge dramatically; demonstrates specification gaps that benchmarks miss.

17. **"Forecasting rare language model behaviors"** (Anthropic, Feb 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_39_forecasting_rare_behaviors/paper_extracted.txt`
    - Power-law extrapolation method for predicting deployment-scale rare failures from evaluation-scale data; addresses fundamental calibration problem.

18. **"Many-shot jailbreaking"** (Anthropic, Apr 2024)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_47_many_shot_jailbreaking/paper_extracted.txt`
    - Demonstrates how context window expansion creates vulnerabilities invisible to standard benchmarks.

---

## Cluster 4: Capability Modularity, Entanglement, and Selective Removal
**Relevant to:** P88 (capability modularity vs. entanglement at scale)

### Essential

19. **"Evaluating feature steering: A case study in mitigating social biases"** (Anthropic, Oct 2024)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_36_evaluating_feature_steering/paper_extracted.txt`
    - Key empirical evidence on whether capabilities can be selectively steered; reveals "off-target effects" where steering one feature unexpectedly affects others, directly addressing entanglement.

20. **"Crosscoder Model Diffing"** (Anthropic Interpretability, Feb 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_23_crosscoder_model_diffing/paper_extracted.txt`
    - URL: [https://transformer-circuits.pub/2025/crosscoder-diffing-update/index.html](https://transformer-circuits.pub/2025/crosscoder-diffing-update/index.html)
    - Method for comparing model representations across training checkpoints; relevant to understanding how capabilities organize as models scale.

### Recommended

21. **"Beyond Data Filtering: Knowledge Localization for Capability Removal in LLMs (SGTM)"** (listed above, also relevant here)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_06_selective_gradient_masking/paper_extracted.txt`
    - Demonstrates that dangerous knowledge can be localized into dedicated parameters and removed; evidence for partial modularity of capabilities.

22. **"Recommendations for Technical AI Safety Research Directions"** (Alignment Science Team, Jan 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_31_recommendations_for_technical_ai_safety_research_directions/paper_extracted.txt`
    - Includes sections on evaluating capabilities, unlearning dangerous information, and understanding model cognition; frames the modularity question within the broader safety research agenda.

---

## Cluster 5: Red Teaming and Sabotage Evaluation Methodology
**Relevant to:** All prompts (cross-cutting methodology)

### Essential

23. **"Sabotage evaluations for frontier models"** (Anthropic, Oct 2024)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_67_sabotage_evaluations/paper_extracted.txt`
    - Defines four sabotage evaluation types (human decision, code, sandbagging, undermining oversight); foundational for understanding how evals can be gamed.

24. **"SHADE-Arena: Sabotage and monitoring evaluations for agentic AI"** (Anthropic)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_69_shade_arena_sabotage_monitoring/paper_extracted.txt`
    - Next-generation agentic sabotage evaluation with 17 complex tasks; shows current models succeed at evasion ~60% of the time despite low overall success.

25. **"Strengthening Red Teams: A Modular Scaffold for Control Evaluations"** (Alignment Science Blog, Nov 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_08_strengthening_red_teams/paper_extracted.txt`
    - Demonstrates that scaffolded red teams dramatically outperform baseline (safety score drops from 0.87 to 0.41); critical context for how red team strength affects eval validity.

### Recommended

26. **"Red Teaming Language Models to Reduce Harms: Methods, Scaling Behaviors, and Lessons Learned"** (Anthropic, 2022)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_65_red_teaming_language_models_to_reduce_harms_methods_scaling_/paper_extracted.txt`
    - Foundational red teaming methodology with scaling analysis; 38,961 attack dataset; RLHF models become harder to red team at scale.

27. **"Anthropic's Pilot Sabotage Risk Report"** (Alignment Science Blog, Oct 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_09_sabotage_risk_report/paper_extracted.txt`
    - First complete misalignment risk assessment for a deployed model (Opus 4); demonstrates how sabotage evaluation feeds into deployment decisions.

28. **"From shortcuts to sabotage: natural emergent misalignment from reward hacking"** (Anthropic, Nov 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_30_emergent_misalignment_reward_hacking/paper_extracted.txt`
    - Shows misalignment emerges naturally from reward hacking without explicit training; 12% sabotage rate in safety research code tasks.

### Supplementary

29. **"Bloom: an open source tool for automated behavioral evaluations"** (Alignment Science Blog, Dec 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_01_bloom_auto_evals/paper_extracted.txt`
    - Automated eval generation framework; relevant to scalable eval methodology across all topics.

30. **"Automated Researchers Sandbag"** (Alignment Science Blog)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_26_automated_researchers_sandbag/paper_extracted.txt`
    - Current models can sandbag ML experiments without detection by monitors; relevant to research sabotage threat model.

31. **"Sleeper Agents: Training Deceptive LLMs That Persist Through Safety Training"** (Anthropic, Jan 2024)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_70_sleeper_agents_training_deceptive_llms_that_persist_through_/paper_extracted.txt`
    - Backdoor behaviors persist through standard safety training; largest models are most persistent; demonstrates fundamental limits of post-training safety.

32. **"Towards Training-time Mitigations for Alignment Faking in RL"** (Alignment Science Blog, Dec 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_03_alignment_faking_mitigations/paper_extracted.txt`
    - Studies when alignment faking survives RL training; relevant to understanding why benchmark performance may not reflect true model alignment.

33. **"Introducing Anthropic's Safeguards Research Team"** (Alignment Science Blog, Feb 2025)
    - Path: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_27_introducing_anthropic_s_safeguards_research_team/paper_extracted.txt`
    - Overview of Anthropic's approach to jailbreak robustness, automated red teaming, and monitoring; provides institutional context.

---

## Cluster 6: External References (Web)
**Relevant to:** All prompts (system cards, policy frameworks)

### Recommended

34. **Claude System Cards (all models)**
    - URL: [https://www.anthropic.com/system-cards](https://www.anthropic.com/system-cards)
    - Documents actual evaluation methodology and results for deployed Claude models; essential for understanding what "safety benchmark scores" actually measure.

35. **Anthropic Transparency Hub / Model Reports**
    - URL: [https://www.anthropic.com/transparency/model-report](https://www.anthropic.com/transparency/model-report)
    - Ongoing reporting on model capabilities and safety evaluations.

36. **"Do the biorisk evaluations of AI labs actually measure the risk of developing bioweapons?"** (Epoch AI)
    - URL: [https://epochai.substack.com/p/do-the-biorisk-evaluations-of-ai](https://epochai.substack.com/p/do-the-biorisk-evaluations-of-ai)
    - Critical examination of CBRN eval methodology gaps across labs.

---

## Summary by Priority

| Priority | Count | Items |
|----------|-------|-------|
| Essential | 14 | #1, #2, #3, #6, #7, #8, #13, #14, #15, #19, #20, #23, #24, #25 |
| Recommended | 14 | #4, #5, #9, #10, #11, #12, #16, #17, #18, #22, #26, #27, #28, #34 |
| Supplementary | 8 | #21, #29, #30, #31, #32, #33, #35, #36 |