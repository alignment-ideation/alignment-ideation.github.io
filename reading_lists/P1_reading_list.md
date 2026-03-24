Now I have all the information I need. Let me compile the comprehensive structured reading list.

---

# Prerequisite Reading List for Partition 1: Red Teaming / Prompt Injection / Agentic

## How to Use This List

This list is organized by topic. Each entry includes the resource, a one-line description, and which specific ideas from prompts P1/P43/P44/P70/P83 it informs. Resources marked **[PRIORITY]** are the most important for calibrating judgment across all ideas. Resources marked **[LOCAL]** have summaries available in the project repository.

---

## TOPIC 1: Constitutional Classifiers and Production Jailbreak Defense (Anthropic)

These are essential context for P83 ideas (scaling safety classifiers) and P70 ideas (detecting jailbreak states from artifacts).

1. **[PRIORITY] Constitutional Classifiers: Defending against Universal Jailbreaks** (Anthropic, Feb 2025)
   - Input/output classifiers trained on synthetic data from a "constitution" of allowed/disallowed content; reduced ASR from 86% to 4.4% with 0.38% overrefusal increase.
   - WHY: The baseline architecture that P83 ideas about policy-conditioned classifiers and benign-side training directly build upon. Raters must understand this to evaluate incremental novelty.
   - Paper: [arxiv.org/abs/2501.18837](https://arxiv.org/abs/2501.18837)
   - Blog: [anthropic.com/research/constitutional-classifiers](https://www.anthropic.com/research/constitutional-classifiers)
   - LOCAL: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_22_constitutional_classifiers/paper_extracted.txt`

2. **[PRIORITY] Constitutional Classifiers++: Efficient Production-Grade Defenses** (Anthropic, Jan 2026)
   - Two-stage architecture: internal activation probe screens all traffic, escalates to exchange classifier. 1% compute overhead, 0.05% refusal rate. No universal jailbreak found in 1,700+ hours of red teaming.
   - WHY: Directly demonstrates the probe-based jailbreak detection approach that P70 ideas propose studying. Shows that internal activations already detect jailbreaks in production. Critical for evaluating whether P70 proposals offer something beyond what Anthropic has already deployed.
   - Paper: [arxiv.org/abs/2601.04603](https://arxiv.org/abs/2601.04603)
   - Blog: [anthropic.com/research/next-generation-constitutional-classifiers](https://www.anthropic.com/research/next-generation-constitutional-classifiers)
   - LOCAL: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_52_next_generation_constitutional_classifiers/paper_extracted.txt`

3. **Cost-Effective Constitutional Classifiers via Representation Re-use** (Anthropic Alignment Science Blog, 2025)
   - Linear probes on model activations match standalone classifiers at negligible cost; EMA probes outperform dedicated classifiers with 2% of policy model parameters.
   - WHY: Directly relevant to P70 "Refusal Residue in Logprob Distributions" and P70 "Probing for Jailbreak State." Shows exactly how activation probes perform as safety classifiers in practice.
   - Blog: [alignment.anthropic.com/2025/cheap-monitors/](https://alignment.anthropic.com/2025/cheap-monitors/)
   - LOCAL: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_20_cheap_monitors/paper_extracted.txt`

4. **Anthropic ASL-3 Deployment Safeguards Report** (Anthropic, May 2025)
   - Documents the three-part deployment strategy: make systems harder to jailbreak, detect jailbreaks when they occur, iteratively improve defenses. Explains how Constitutional Classifiers fit into ASL-3 compliance.
   - WHY: Provides the deployment context for all P1/P83 ideas. Raters should understand how proposed research would fit into actual deployment safeguards.
   - URL: [anthropic.com/asl3-deployment-safeguards](https://www.anthropic.com/asl3-deployment-safeguards)

---

## TOPIC 2: Prompt Injection in Agentic Settings

Essential context for P43 (multi-tool agent injection) and P44 (agent email triage injection).

5. **[PRIORITY] AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents** (ETH Zurich, NeurIPS 2024)
   - 97 tasks, 629 security test cases across 4 agent domains. Key finding: more capable models are *easier* to attack (inverse scaling). Best attack achieves 57.7% ASR. All tested defenses trade off utility for security.
   - WHY: The primary benchmark all P43/P44 ideas must be positioned against. "How Injection Risk Scales with Agent Tool Count" (P43) directly studies a question AgentDojo's cross-environment results already partially address.
   - Paper: [arxiv.org/abs/2406.13352](https://arxiv.org/abs/2406.13352)
   - LOCAL: `/workspace/1_paper_and_blog_post_summaries/paper_summaries/agentdojo_a_dynamic_environment_to_evaluate_prompt_injection_attacks_and_defense/report_1k.md`

6. **[PRIORITY] Adaptive Attacks Break Defenses Against Indirect Prompt Injection Attacks on LLM Agents** (UIUC, Feb 2025)
   - Tests 8 IPI defenses with adaptive attacks; all bypassed with >50% ASR. First paper to explore adaptive attacks specifically targeting agent safety.
   - WHY: Critical for evaluating P43 and P44 ideas. "Surface Dependence of Prompt Injection Defenses" (P1) and "Cross-Tool Injection in Multi-Tool Agents" (P43) must reckon with the finding that classifier-based defenses fail under adaptive attack.
   - Paper: [arxiv.org/abs/2503.00061](https://arxiv.org/abs/2503.00061)
   - LOCAL: `/workspace/0_raw_resources/paper_pdfs/adaptive_attacks_break_defenses_against_indirect_prompt_injection_attacks_on_llm/metadata.json`

7. **[PRIORITY] Defeating Prompt Injections by Design (CaMeL)** (Google DeepMind, Mar 2025)
   - Data-flow-tracking defense separating trusted control flow from untrusted data. Practically solved AgentDojo's security evaluation (77% task completion with provable security). Dual-model architecture with Privileged/Quarantined LLMs.
   - WHY: The strongest current defense paradigm. P43 "Cross-Tool Injection" and P44 "Does Splitting Read from Act Create a Real Injection Bottleneck?" propose architectural separations that CaMeL already implements. Raters must understand CaMeL to judge incremental value.
   - Paper: [arxiv.org/abs/2503.18813](https://arxiv.org/abs/2503.18813)

8. **The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions** (OpenAI, Apr 2024)
   - Trains models to distinguish trusted from untrusted instructions via priority levels. Applied to GPT-3.5, dramatically increased robustness to prompt injection even for unseen attack types.
   - WHY: Directly relevant to P43 ideas about cross-tool injection. This is the main alternative to architectural defenses -- training the model itself to ignore untrusted instructions.
   - Paper: [arxiv.org/abs/2404.13208](https://arxiv.org/abs/2404.13208)
   - Blog: [openai.com/index/the-instruction-hierarchy/](https://openai.com/index/the-instruction-hierarchy/)

9. **Lessons from Defending Gemini Against Indirect Prompt Injections** (Google DeepMind, May 2025)
   - Comprehensive report testing spotlighting, self-reflection, classifiers, and adversarial fine-tuning against IPI in Gemini. Key finding: better instruction-following models are sometimes *easier* to attack.
   - WHY: P44 "How Adversarial Inputs Affect Monitor Accuracy in Agent Pipelines" is studying the same problem space -- how monitors perform under adversarial input. DeepMind's empirical results set the state-of-the-art baseline.
   - Paper: [arxiv.org/abs/2505.14534](https://arxiv.org/abs/2505.14534)

10. **Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection** (Greshake et al., Feb 2023)
    - Foundational paper defining indirect prompt injection as a threat category. Establishes the core threat model: adversarial content in tool outputs redirecting agent behavior.
    - WHY: Defines the threat model all P43/P44 ideas assume. Short and essential background.
    - Paper: [arxiv.org/abs/2302.12173](https://arxiv.org/abs/2302.12173)

11. **Mitigating the Risk of Prompt Injections in Browser Use** (Anthropic, Nov 2025)
    - Anthropic's production report on multi-layer defense for Claude browser agents: RL-based training + classifiers + human red teaming. Achieved ~1% ASR.
    - WHY: Shows the state of production deployment for prompt injection defense. P43 "Hiding Tool Outputs from Agent Monitors" directly relates to the classifier-based monitoring approach described here.
    - Blog: [anthropic.com/research/prompt-injection-defenses](https://www.anthropic.com/research/prompt-injection-defenses)
    - LOCAL: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_62_prompt_injection_defenses/paper_extracted.txt`

12. **Continuously Hardening ChatGPT Atlas Against Prompt Injection Attacks** (OpenAI, Jul 2025)
    - OpenAI's continuous adversarial training loop for browser agent security. Continuously trains agent models against best automated attacker, rolling out hardened checkpoints.
    - WHY: Relevant to P1 "Surface Dependence" -- shows how one lab does continuous defense improvement. Also relevant to P44 "Action Stability Under Input Perturbation" as context for what production defense looks like.
    - Blog: [openai.com/index/hardening-atlas-against-prompt-injection/](https://openai.com/index/hardening-atlas-against-prompt-injection/)

13. **Designing AI Agents to Resist Prompt Injection** (OpenAI, 2025)
    - OpenAI's design philosophy for agent prompt injection resistance: even if injection succeeds, constrain the impact through system design.
    - WHY: The "design for containment even on success" framing is relevant to P43's "Hiding Tool Outputs from Agent Monitors" and P44's read/act separation idea.
    - Blog: [openai.com/index/designing-agents-to-resist-prompt-injection/](https://openai.com/index/designing-agents-to-resist-prompt-injection/)

---

## TOPIC 3: Adaptive Attacks and Defense Evaluation Methodology

Essential for understanding how to evaluate whether defenses (P1) and classifiers (P83) actually work.

14. **[PRIORITY] The Attacker Moves Second: Stronger Adaptive Attacks Bypass Defenses Against LLM Jailbreaks and Prompt Injections** (Carlini, Nasr, Tramer et al. / Google DeepMind, Oct 2025)
    - Demonstrates that 12 recent defenses fail under adaptive attack using gradient descent, RL, search, and human red-teaming. Static attack evaluation is fundamentally flawed.
    - WHY: Directly motivates P1 "Measuring Attack Diversity by Defense Disagreement" and P1 "Surface Dependence of Prompt Injection Defenses." Raters must understand this to evaluate whether P1 ideas adequately address the adaptive attack problem.
    - Paper: [arxiv.org/abs/2510.09023](https://arxiv.org/abs/2510.09023)

15. **On Adaptive Attacks to Adversarial Example Defenses** (Tramer, Carlini et al., 2020)
    - The classic methodology paper: 13 published defenses circumvented with properly tuned adaptive attacks. Established best practices for defense evaluation.
    - WHY: The intellectual foundation for all P1 ideas. "Measuring Attack Diversity by Defense Disagreement" is essentially proposing a metric framework inspired by these principles.
    - Paper: [arxiv.org/abs/2002.08347](https://arxiv.org/abs/2002.08347)

16. **On Evaluating Adversarial Robustness** (Carlini et al., 2019)
    - Best practices for evaluating adversarial robustness: adaptive attacks, proper threat models, evaluation pitfalls.
    - WHY: The foundational methodology that the prompt injection field has not yet adopted. P1 ideas are attempts to bring this rigor to PI evaluation.
    - Paper: [arxiv.org/abs/1902.06705](https://arxiv.org/abs/1902.06705)

---

## TOPIC 4: Benchmarks and Datasets for Prompt Injection and Agent Security

Additional benchmark context for P43/P44.

17. **InjecAgent: Benchmarking Indirect Prompt Injections in Tool-Integrated LLM Agents** (UIUC, Mar 2024)
    - 1,054 test cases for IPI attacks on tool-integrated agents. The static benchmark approach that generated proposals aim to improve beyond.
    - WHY: Baseline for P43 "How Injection Risk Scales with Agent Tool Count" -- provides the per-tool attack surface data.
    - Paper: [arxiv.org/abs/2403.02691](https://arxiv.org/abs/2403.02691)

18. **AgentDyn: A Dynamic Open-Ended Benchmark for Evaluating Prompt Injection Attacks** (Feb 2026)
    - Most recent agent security benchmark addressing AgentDojo's limitations (static tasks, lack of helpful third-party instructions).
    - WHY: Shows the latest evolution of agent PI benchmarks. Relevant to evaluating whether P43/P44 ideas are already addressed by recent benchmark developments.
    - Paper: [arxiv.org/abs/2602.03117](https://arxiv.org/abs/2602.03117)

19. **LLMail-Inject: A Dataset from a Realistic Adaptive Prompt Injection Challenge** (Microsoft, Jun 2025)
    - 208K attack submissions from 839 participants targeting known PI defenses in an email triage setting.
    - WHY: Closest existing work to P44's email triage scenario. The dataset of adaptive attacks against stacked defenses is directly relevant to "How Adversarial Inputs Affect Monitor Accuracy."
    - Paper: [arxiv.org/abs/2506.09956](https://arxiv.org/abs/2506.09956)

20. **Agent Security Bench (ASB)** (Rutgers, Oct 2024)
    - 10 scenarios, 400+ tools, maps the multi-stage attack surface for LLM agents.
    - WHY: Relevant to P43 "How Injection Risk Scales with Agent Tool Count" -- provides the multi-tool attack surface framework.
    - Paper: [arxiv.org/abs/2410.02644](https://arxiv.org/abs/2410.02644)

21. **WASP: Benchmarking Web Agent Security Against Prompt Injection** (Meta, Apr 2025)
    - Web agent security benchmark on VisualWebArena. Agents follow injected instructions 16-86% of the time but rarely complete attacker goals end-to-end.
    - WHY: Shows the gap between following an injection and completing an attack goal -- relevant to P43/P44's focus on end-to-end attack success.
    - Paper: [arxiv.org/abs/2504.18575](https://arxiv.org/abs/2504.18575)

22. **Formalizing and Benchmarking Prompt Injection Attacks and Defenses** (Duke, Oct 2023)
    - Formal framework for PI attacks: 5 attacks, 10 defenses, 10 LLMs. Provides the formal attack taxonomy.
    - WHY: The taxonomy is useful context for P1 "Measuring Attack Diversity by Defense Disagreement."
    - Paper: [arxiv.org/abs/2310.12815](https://arxiv.org/abs/2310.12815)

---

## TOPIC 5: Jailbreak Mechanisms, Detection, and Representation-Level Analysis

Essential for P70 (jailbreak class detection from artifacts) and relevant to P83.

23. **[PRIORITY] Refusal in Language Models Is Mediated by a Single Direction** (Arditi et al., Jun 2024)
    - Shows refusal is mediated by a single linear direction in activation space. Removing this direction eliminates refusal entirely.
    - WHY: Foundational for P70 "Probing for Jailbreak State Independent of Content Harmfulness." This establishes the linear representation framework that P70 ideas build upon.
    - Paper: [arxiv.org/abs/2406.11717](https://arxiv.org/abs/2406.11717)

24. **The Geometry of Refusal: Concept Cones and Representational Independence** (ICML 2025)
    - Shows refusal is governed by *multiple* independent directions and concept cones, not just one. Complicates the naive single-probe approach.
    - WHY: Directly challenges the simplicity assumption in P70 proposals. Raters should consider whether P70 probing approaches account for this multi-dimensional refusal geometry.
    - Paper: [arxiv.org/abs/2502.17420](https://arxiv.org/abs/2502.17420)

25. **LLMs Encode Harmfulness and Refusal Separately** (Zhao et al., Jul 2025)
    - Harm recognition and refusal are distinct internal representations. Jailbreaks suppress refusal without altering harmfulness judgment.
    - WHY: Directly validates the hypothesis behind P70 "Probing for Jailbreak State Independent of Content Harmfulness" -- that the model still "knows" content is harmful during a jailbreak, it just doesn't refuse.
    - Paper: [arxiv.org/abs/2507.11878](https://arxiv.org/abs/2507.11878)

26. **Understanding Jailbreak Success: A Study of Latent Space Dynamics** (Ball et al., Jun 2024)
    - Jailbreaks suppress harmfulness features in activation space; steering vectors from one jailbreak class can mitigate others.
    - WHY: Most directly relevant prior work for P70's probe-based proposals. Tests the exact hypothesis P70 ideas build on.
    - Paper: [arxiv.org/abs/2406.09289](https://arxiv.org/abs/2406.09289)

27. **Jailbreaking Leaves a Trace: Understanding and Detecting Jailbreak Attacks from Internal Representations** (Feb 2026)
    - Systematic layer-wise analysis shows jailbreak inputs form distinct internal states separable from refusal. Detection at last input token enables pre-generation detection.
    - WHY: Most recent and comprehensive work on exactly what P70 "Detecting Jailbreak Methods from Response Artifacts" proposes. Raters must know this to evaluate the novelty of P70 ideas.
    - Paper: [arxiv.org/abs/2602.11495](https://arxiv.org/abs/2602.11495)

28. **LLM Jailbreak Detection for (Almost) Free!** (Chen et al., Sep 2025)
    - Uses first-token logprob distribution differences between jailbreak and benign prompts for near-zero-cost detection.
    - WHY: Directly relevant to P70 "Refusal Residue in Logprob Distributions During Jailbroken Generation." This is the closest existing work to that specific idea.
    - Paper: [arxiv.org/abs/2509.14558](https://arxiv.org/abs/2509.14558)

29. **Obfuscated Activations Bypass LLM Latent-Space Defenses** (Bailey et al., Dec 2024)
    - Probes, SAEs, and OOD detectors can be bypassed by adversarial activation obfuscation. Establishes adversarial limits of probe-based approaches.
    - WHY: Critical negative result for all P70 ideas. If probes can be bypassed by adversarial optimization, how robust are P70's proposed detection methods? Raters should weight this concern.
    - Paper: [arxiv.org/abs/2412.09565](https://arxiv.org/abs/2412.09565)

30. **What Features in Prompts Jailbreak LLMs? Investigating the Mechanisms Behind Attacks** (He et al., CISPA, Nov 2025)
    - Uses probes to investigate which prompt features cause jailbreaks at the representation level; applies causal interventions.
    - WHY: Closest existing work to the component-ablation approach proposed in P70. Overlapping methodology with "Detecting Jailbreak Methods from Response Artifacts."
    - Paper: [aclanthology.org/2025.blackboxnlp-1.28/](https://aclanthology.org/2025.blackboxnlp-1.28/)

31. **Safety Alignment Should Be Made More Than Just a Few Tokens Deep** (Qi et al., Jun 2024)
    - Alignment primarily adapts the generative distribution over the first few output tokens ("shallow safety alignment").
    - WHY: Directly relevant to P70 "Refusal Residue in Logprob Distributions" -- explains *why* logprob distributions at generation onset contain safety-relevant signal.
    - Paper: [arxiv.org/abs/2406.05946](https://arxiv.org/abs/2406.05946)

---

## TOPIC 6: Jailbreak Attacks (Taxonomy and Techniques)

Background for understanding the attack landscape that P1 and P70 ideas study.

32. **Jailbroken: How Does LLM Safety Training Fail?** (Wei et al., UC Berkeley, Jul 2023)
    - Competing-objectives and mismatched-generalization taxonomy of jailbreak failure modes.
    - WHY: P70 ideas about detecting jailbreak *methods* from artifacts require understanding the taxonomy of how jailbreaks work. This paper provides it.
    - Paper: [arxiv.org/abs/2307.02483](https://arxiv.org/abs/2307.02483)

33. **Jailbreaking Leading Safety-Aligned LLMs with Simple Adaptive Attacks** (Andriushchenko et al., EPFL, Apr 2024)
    - Simple adaptive attacks achieve 100% ASR even on adversarially trained models. Key result: hardening against specific attacks doesn't generalize to adaptive attackers.
    - WHY: Critical context for P83 "Adversarial Robustness of Policy-Conditioned Safety Classifiers." If hardened classifiers don't resist adaptive attacks, what would make P83's approach different?
    - Paper: [arxiv.org/abs/2404.02151](https://arxiv.org/abs/2404.02151)

34. **A StrongREJECT for Empty Jailbreaks** (Souly et al., UC Berkeley/FAR AI, Feb 2024)
    - Jailbreaks that bypass safety training often degrade model capabilities. Successful bypass does not mean useful payload.
    - WHY: Relevant to P70 "Detecting Jailbreak Methods from Response Artifacts" -- capability degradation during jailbreaks may itself be a detectable artifact.
    - Paper: [arxiv.org/abs/2402.10260](https://arxiv.org/abs/2402.10260)

35. **Does Refusal Training in LLMs Generalize to the Past Tense?** (Andriushchenko & Flammarion, Jul 2024)
    - Safety training fails to generalize across simple linguistic transforms. Reframing harmful requests in past tense bypasses refusal.
    - WHY: Key context for P83 "Do Jailbreak Defenses Transfer Across Harm Categories?" If safety doesn't transfer across *tenses*, what hope is there for cross-category transfer?
    - Paper: [arxiv.org/abs/2407.11969](https://arxiv.org/abs/2407.11969)

36. **Many-Shot Jailbreaking** (Anil et al., Anthropic, Apr 2024)
    - Scaling-law-based jailbreak exploiting long contexts. The type of novel attack strategy that Constitutional Classifiers were designed to defend against.
    - WHY: Context for P83 ideas -- shows how novel attack strategies emerge that classifiers must adapt to.
    - Paper: [arxiv.org/abs/2404.05862](https://arxiv.org/abs/2404.05862)
    - LOCAL: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_47_many_shot_jailbreaking/paper_extracted.txt`

37. **GCG: Universal and Transferable Adversarial Attacks on Aligned Language Models** (Zou et al., CMU/DeepMind, Jul 2023)
    - Foundational gradient-based adversarial suffix generation. The canonical white-box attack baseline.
    - WHY: Referenced across all attack literature. Background for understanding the attack landscape.
    - Paper: [arxiv.org/abs/2307.15043](https://arxiv.org/abs/2307.15043)

---

## TOPIC 7: Safety Classifiers and Cross-Category Transfer

Essential for P83 (scaling safety classifiers across harm categories).

38. **[PRIORITY] Llama Guard: LLM-based Input-Output Safeguard** (Meta, Dec 2023)
    - Taxonomy-conditioned LLM safety classifier with category-adaptable prompting. Zero-shot and few-shot adaptation results.
    - WHY: The exact architecture P83 "Adversarial Robustness of Policy-Conditioned Safety Classifiers" and "Automating the Benign Side of Constitutional Classifiers" build upon. Raters must understand Llama Guard to evaluate P83's incremental contribution.
    - Paper: [arxiv.org/abs/2312.06674](https://arxiv.org/abs/2312.06674)

39. **WildGuard: Open One-Stop Moderation Tools** (Allen AI, Jun 2024)
    - Multi-task safety classifier covering 13 risk categories with adversarial training. Multi-task training across harm types improves generalization.
    - WHY: Directly relevant to P83 "Do Jailbreak Defenses Transfer Across Harm Categories?" WildGuard's cross-category results are the baseline.
    - Paper: [arxiv.org/abs/2406.18495](https://arxiv.org/abs/2406.18495)

40. **ShieldGemma: Generative AI Content Moderation** (Google DeepMind, Jul 2024)
    - Strong generalization from synthetic data in safety classification across harm types. Novel LLM-based data curation pipeline.
    - WHY: Relevant to P83 "Automating the Benign Side of Constitutional Classifiers" -- shows that synthetic data generation can enable multi-category classifiers.
    - Paper: [arxiv.org/abs/2407.21772](https://arxiv.org/abs/2407.21772)

41. **Improving Few-shot Generalization of Safety Classifiers** (Balashankar et al., Google, Oct 2023)
    - Augmenting with examples from existing safety rules improves new-rule generalization by 7-17% F1.
    - WHY: Directly addresses the core problem P83 tackles: can safety classifiers generalize to new categories with minimal data?
    - Paper: [arxiv.org/abs/2310.16959](https://arxiv.org/abs/2310.16959)

42. **HarmBench: Standardized Evaluation Framework for Red Teaming and Robust Refusal** (Mazeika et al., Feb 2024)
    - Standardized framework for co-developing attacks and defenses with proper metrics.
    - WHY: P83 ideas proposing cross-category evaluation need frameworks like HarmBench's for proper comparison.
    - Paper: [arxiv.org/abs/2402.04249](https://arxiv.org/abs/2402.04249)

---

## TOPIC 8: Activation Probes and Representation Engineering

Background methodology for P70 and P1 "Activation Probes for Prompt Injection."

43. **Simple Probes Can Catch Sleeper Agents** (Anthropic, Apr 2024)
    - Linear probes on residual stream activations achieve >99% AUROC detecting when sleeper agents will defect.
    - WHY: Establishes that linear probes work for safety-critical detection. P1 "Activation Probes for Prompt Injection" proposes the same approach for injection detection.
    - Blog: [anthropic.com/research/probes-catch-sleeper-agents](https://www.anthropic.com/research/probes-catch-sleeper-agents)
    - LOCAL: `/workspace/0_raw_resources/blog_post_htmls/anthropic_research/paper_58_probes_catch_sleeper_agents/paper_extracted.txt`

44. **Representation Engineering: A Top-Down Approach to AI Transparency** (Zou et al., Oct 2023)
    - Framework for reading and controlling high-level cognitive phenomena via representations.
    - WHY: Methodological foundation for P70 and P1 probing experiments.
    - Paper: [arxiv.org/abs/2310.01405](https://arxiv.org/abs/2310.01405)

45. **Improving Alignment and Robustness with Circuit Breakers** (Zou et al., Gray Swan/CMU, Jun 2024)
    - Representation rerouting for suppressing harmful outputs at the representation level.
    - WHY: An alternative to probe-based detection -- circuit breakers *prevent* rather than *detect*. Context for evaluating whether P70's detection approach is the right framing.
    - Paper: [arxiv.org/abs/2406.04313](https://arxiv.org/abs/2406.04313)

---

## TOPIC 9: Agent Safety Transfer and Monitor Reliability

Context for P43/P44 ideas about monitor degradation and safety transfer gaps.

46. **Refusal-Trained LLMs Are Easily Jailbroken As Browser Agents** (Kumar et al., Oct 2024)
    - GPT-4o attempted 98/100 harmful behaviors as an agent despite chat-level refusal training. Safety refusals fail to transfer from chat to agentic settings.
    - WHY: Documents the exact chat-to-agentic safety transfer gap that P43/P44 ideas characterize for prompt injection specifically.
    - Paper: [arxiv.org/abs/2410.13886](https://arxiv.org/abs/2410.13886)

47. **Adaptive Attacks on Trusted Monitors Subvert AI Control Protocols** (Terekhov et al., EPFL, Oct 2025)
    - Untrusted models can subvert LLM-based monitors using prompt injections embedded in model outputs. Jailbreak robustness does not predict robustness to model-adversarial evasion.
    - WHY: Directly relevant to P44 "How Adversarial Inputs Affect Monitor Accuracy." Shows the monitor-adversary threat model is real.
    - Paper: [arxiv.org/abs/2510.09462](https://arxiv.org/abs/2510.09462)

48. **Progent: Programmable Privilege Control for LLM Agents** (UC Berkeley, Apr 2025)
    - Domain-specific language for fine-grained tool-call policies. Reduces ASR to 0% on AgentDojo and ASB with manual policies.
    - WHY: An architectural alternative to the approaches P43 proposes. If privilege control already achieves 0% ASR, what's the marginal value of studying injection scaling?
    - Paper: [arxiv.org/abs/2504.11703](https://arxiv.org/abs/2504.11703)

49. **STACK: Adversarial Attacks on LLM Safeguard Pipelines** (ARC, Jun 2025)
    - Studies staged attacks against defense-in-depth pipelines combining input classifiers, output classifiers, and activation monitors.
    - WHY: Relevant to P43 "Hiding Tool Outputs from Agent Monitors" -- studies how adversaries attack multi-layer defense architectures.
    - Paper: [arxiv.org/abs/2506.24068](https://arxiv.org/abs/2506.24068)

---

## TOPIC 10: Additional Defense Approaches

Other defenses referenced by the ideas being judged.

50. **StruQ: Defending Against Prompt Injection with Structured Queries** (UC Berkeley, Feb 2024)
    - Separates prompts and data into two channels via structured instruction tuning.
    - WHY: P44 "Does Splitting Read from Act Create a Real Injection Bottleneck?" proposes a similar architectural separation. StruQ is the existing version of this idea.
    - Paper: [arxiv.org/abs/2402.06363](https://arxiv.org/abs/2402.06363)

51. **SecAlign: Defending Against Prompt Injection with Preference Optimization** (UC Berkeley/Meta, Oct 2024)
    - DPO-based defense achieving <10% ASR against unseen attacks.
    - WHY: Shows that training-based defenses can generalize to unseen attacks -- relevant to P83's transfer question.
    - Paper: [arxiv.org/abs/2410.05451](https://arxiv.org/abs/2410.05451)

52. **Meta SecAlign: A Secure Foundation LLM Against Prompt Injection Attacks** (Meta, Jul 2025)
    - First open-source commercial-grade LLM with built-in PI defense. Security generalizes to unseen agentic tasks.
    - WHY: Directly relevant to P1 "Surface Dependence" -- shows whether security training transfers to untrained tool surfaces.
    - Paper: [arxiv.org/abs/2507.02735](https://arxiv.org/abs/2507.02735)

53. **Defending Against Indirect Prompt Injection Attacks With Spotlighting** (Microsoft, Mar 2024)
    - Prompt-engineering defense that was subsequently broken by adaptive attacks.
    - WHY: A concrete example of the defense-evaluation overestimation problem that P1 ideas address.
    - Paper: [arxiv.org/abs/2403.14720](https://arxiv.org/abs/2403.14720)

54. **PromptArmor: Simple yet Effective Prompt Injection Defenses** (UC Berkeley/CMU, Jul 2025)
    - Near-zero ASR on AgentDojo using an LLM guardrail that detects and removes injected prompts before agent processing.
    - WHY: Challenges the belief that off-the-shelf LLMs cannot defend against PI. Relevant to P44 email triage ideas.
    - Paper: [arxiv.org/abs/2507.15219](https://arxiv.org/abs/2507.15219)

---

## TOPIC 11: Anthropic System Cards and Strategic Context

55. **Claude Opus 4 & Claude Sonnet 4 System Card** (Anthropic, May 2025)
    - Comprehensive system card covering capabilities, safety evaluations, and deployment decisions.
    - URL: [anthropic.com/claude-4-system-card](https://www.anthropic.com/claude-4-system-card)
    - PDF: [www-cdn.anthropic.com/.../claude-4-system-card.pdf](https://www-cdn.anthropic.com/4263b940cabb546aa0e3283f35b686f4f3b2ff47.pdf)

56. **Recommendations for Technical AI Safety Research Directions** (Anthropic Alignment Science, Jan 2025)
    - Anthropic's view on important open problems including: realistic jailbreak benchmarks, adaptive defenses, behavioral monitoring, activation monitoring, anomaly detection.
    - WHY: Raters should understand which research directions Anthropic considers important to evaluate whether the judged ideas align with real research needs.
    - Blog: [alignment.anthropic.com/2025/recommended-directions/](https://alignment.anthropic.com/2025/recommended-directions/)
    - LOCAL: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_31_recommendations_for_technical_ai_safety_research_directions/paper_extracted.txt`

57. **Introducing Anthropic's Safeguards Research Team** (Anthropic Alignment Science Blog, Feb 2025)
    - Announces team focused on jailbreak robustness, automated red teaming, monitoring for misuse/misalignment, rapid response, and safety cases.
    - WHY: Shows which of the judged ideas' topics Anthropic is actively investing in.
    - Blog: [alignment.anthropic.com/2025/introducing-safeguards-research-team/](https://alignment.anthropic.com/2025/introducing-safeguards-research-team/)
    - LOCAL: `/workspace/0_raw_resources/blog_post_htmls/alignment_science_blog/paper_27_introducing_anthropic_s_safeguards_research_team/paper_extracted.txt`

58. **Red Teaming Language Models to Reduce Harms** (Anthropic, Sep 2022)
    - Early systematic red teaming: 38,961 attacks, scaling behaviors across model sizes. RLHF models harder to red team at scale.
    - WHY: Historical context for the red teaming paradigm that P1 ideas extend.
    - Paper: [arxiv.org/abs/2209.07858](https://arxiv.org/abs/2209.07858)
    - Blog: [anthropic.com/research/red-teaming-language-models-to-reduce-harms](https://www.anthropic.com/research/red-teaming-language-models-to-reduce-harms-methods-scaling-behaviors-and-lessons-learned)

---

## Suggested Priority Reading Order for Time-Constrained Raters

If raters can only read 10 things, prioritize these in order:

1. **Constitutional Classifiers (blog post)** -- 10 min read, establishes the core defense paradigm (#1 above)
2. **Constitutional Classifiers++ (blog post)** -- 10 min read, shows probe-based detection already in production (#2)
3. **AgentDojo summary** -- 15 min read via the local 1K summary (#5)
4. **Adaptive Attacks Break Defenses Against IPI** (abstract + results) -- 10 min (#6)
5. **CaMeL** (abstract + Section 3) -- 15 min (#7)
6. **Refusal Is Mediated by a Single Direction** (abstract + key figures) -- 10 min (#23)
7. **LLMs Encode Harmfulness and Refusal Separately** (abstract) -- 5 min (#25)
8. **Llama Guard** (abstract + Section 2) -- 10 min (#38)
9. **Cost-Effective Constitutional Classifiers via Representation Re-use** (blog) -- 15 min (#3)
10. **Anthropic Recommendations for Technical AI Safety Research** (adversarial robustness section) -- 10 min (#56)