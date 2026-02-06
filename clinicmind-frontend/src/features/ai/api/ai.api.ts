import type {
  TranscriptionRequest,
  TranscriptionResponse,
  GenerationRequest,
  GenerationResponse,
  ChatRequest,
  ChatResponse,
  AIGenerationType,
} from "../types/ai.types"
import { AI_WARNING_MESSAGE } from "../constants/aiConfig"

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const GENERATION_TEMPLATES: Record<
  AIGenerationType,
  (instructions: string) => string
> = {
  report: (instructions) =>
    `COMPTE RENDU DE CONSULTATION

Date : ${new Date().toLocaleDateString("fr-FR")}

Motif de consultation :
${instructions || "Consultation de routine"}

Examen clinique :
- État gingival : satisfaisant
- Hygiène bucco-dentaire : correcte
- Examen dentaire : ${instructions ? "Voir détails ci-dessous" : "RAS"}

${instructions ? `\nObservations :\n${instructions}` : ""}

Diagnostic :
À compléter par le praticien.

Traitement réalisé :
À compléter par le praticien.

Conclusion et suivi :
Prochain contrôle recommandé dans 6 mois.`,

  prescription: (instructions) =>
    `ORDONNANCE

Date : ${new Date().toLocaleDateString("fr-FR")}

${instructions || `- Paracétamol 1000mg
  1 comprimé si douleur, maximum 3 par jour
  Durée : 5 jours

- Bain de bouche antiseptique
  2 fois par jour après le brossage
  Durée : 7 jours`}

Ne pas dépasser les doses prescrites.
Consulter en cas de persistance des symptômes.`,

  advice: (instructions) =>
    `CONSEILS POST-OPÉRATOIRES
${instructions ? `\nIntervention : ${instructions}\n` : ""}
📋 DANS LES PREMIÈRES 24 HEURES :

• Ne pas cracher, ne pas rincer la bouche
• Appliquer une compresse froide sur la joue (15 min toutes les heures)
• Éviter les aliments chauds, préférer le tiède ou froid
• Ne pas fumer ni boire d'alcool
• Dormir avec la tête légèrement surélevée

📋 LES JOURS SUIVANTS :

• Reprendre une alimentation normale progressivement
• Brossage doux en évitant la zone opérée
• Bains de bouche doux à partir du lendemain
• Éviter les efforts physiques intenses pendant 48h

⚠️ CONSULTEZ EN URGENCE SI :

• Saignement abondant qui ne s'arrête pas
• Douleur intense non calmée par les antalgiques
• Fièvre supérieure à 38°C
• Gonflement important qui s'aggrave après 48h
• Difficulté à ouvrir la bouche ou à avaler

📞 En cas de doute, contactez le cabinet.`,

  letter: (instructions) =>
    `Cher(e) Confrère,

Je vous adresse ce courrier concernant notre patient(e) commun(e).

${instructions || "Merci de bien vouloir prendre en charge ce patient pour avis et traitement."}

Je reste à votre disposition pour tout renseignement complémentaire.

Confraternellement,`,

  summary: (instructions) =>
    `RÉSUMÉ DU DOSSIER PATIENT

📋 INFORMATIONS CLÉS :
${instructions || "• À compléter selon le dossier patient"}

📋 ANTÉCÉDENTS NOTABLES :
• À compléter

📋 TRAITEMENTS EN COURS :
• À compléter

📋 POINTS D'ATTENTION :
• À compléter

Ce résumé a été généré automatiquement et doit être vérifié.`,

  custom: (instructions) =>
    instructions || "Veuillez fournir des instructions pour la génération.",
}

const CHAT_RESPONSES: Record<string, string> = {
  antécédents:
    "D'après le dossier, le patient présente les antécédents suivants :\n\n• Hypertension artérielle traitée\n• Diabète de type 2\n• Allergie à la pénicilline (réaction cutanée)\n\nAucun antécédent chirurgical majeur noté.",
  traitements:
    "Traitements en cours selon le dossier :\n\n• Metformine 500mg - 2x/jour\n• Lisinopril 10mg - 1x/jour\n\nPas de traitement anticoagulant.",
  allergies:
    "Allergies documentées :\n\n⚠️ Pénicilline - Sévérité : ÉLEVÉE\n   Réaction : anaphylactique\n\n⚠️ Latex - Sévérité : MOYENNE\n   Réaction : cutanée",
  consultations:
    "Dernières consultations :\n\n• 15/01/2024 - Extraction dent 46\n• 20/12/2023 - Détartrage\n• 15/09/2023 - Contrôle annuel\n\nProchaine consultation prévue : à planifier",
  soins: "Soins réalisés sur ce patient :\n\n• Extraction dent 46 (janvier 2024)\n• Détartrage complet (décembre 2023)\n• Composite sur 36 (juin 2023)\n• Dévitalisation 15 (mars 2023)",
  default:
    "Je n'ai pas trouvé d'information spécifique sur ce sujet dans le dossier. Pourriez-vous reformuler votre question ou préciser ce que vous recherchez ?",
}

export const aiApi = {
  async transcribe(
    request: TranscriptionRequest
  ): Promise<TranscriptionResponse> {
    await delay(2000 + Math.random() * 2000)
    const mockTexts = [
      "Le patient se présente pour une douleur au niveau de la molaire inférieure droite depuis trois jours. La douleur est spontanée et augmentée par le chaud. À l'examen, on note une carie profonde sur la dent 46 avec test de vitalité positif prolongé.",
      "Consultation de contrôle post-opératoire suite à l'extraction de la dent de sagesse. Cicatrisation normale, pas de signe d'alvéolite. Le patient ne rapporte plus de douleur.",
      "Détartrage complet réalisé ce jour. Bonne coopération du patient. Conseils d'hygiène bucco-dentaire prodigués. Prochain contrôle dans six mois.",
    ]
    return {
      id: `trans-${Date.now()}`,
      text: mockTexts[Math.floor(Math.random() * mockTexts.length)],
      duration: 15 + Math.random() * 30,
      language: request.language || "fr",
      confidence: 0.92 + Math.random() * 0.08,
      timestamp: new Date().toISOString(),
    }
  },

  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    await delay(2000 + Math.random() * 3000)
    const template = GENERATION_TEMPLATES[request.type]
    const content = template(request.instructions)
    return {
      id: `gen-${Date.now()}`,
      content,
      type: request.type,
      modelVersion: "gpt-4-turbo-mock",
      generatedAt: new Date().toISOString(),
      tokensUsed: Math.floor(content.length / 4),
      requiresValidation: true,
      warningMessage: AI_WARNING_MESSAGE,
    }
  },

  async chat(request: ChatRequest): Promise<ChatResponse> {
    await delay(1000 + Math.random() * 1000)
    const question = request.question.toLowerCase()
    let answer = CHAT_RESPONSES.default
    for (const [keyword, response] of Object.entries(CHAT_RESPONSES)) {
      if (question.includes(keyword)) {
        answer = response
        break
      }
    }
    return {
      id: `chat-${Date.now()}`,
      answer,
      sources: ["Dossier patient", "Historique consultations"],
      timestamp: new Date().toISOString(),
    }
  },

  async validateContent(
    _contentId: string,
    _userId: string
  ): Promise<void> {
    await delay(300)
  },
}
