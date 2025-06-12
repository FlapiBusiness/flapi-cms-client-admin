import { configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import fr from '@vee-validate/i18n/dist/locale/fr.json'
import { required, email, numeric, min, max } from '@vee-validate/rules'
import { defineNuxtPlugin } from 'nuxt/app'

/**
 * Plugin Nuxt pour la configuration globale de VeeValidate.
 * @returns {void}
 */
export default defineNuxtPlugin((): void => {
  setupValidationRules()
  setupLocalization()
})

/**
 * Définit les règles de validation globales pour `vee-validate`.
 * @returns {void}
 */
const setupValidationRules: () => void = (): void => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)

  /**
   * Custom confirmed rule with a personalized error message.
   * @param {string} value - The value to validate
   * @param {Record<string, any>} params - The parameters to pass to the rule
   */
  defineRule(
    'confirmed',
    (value: string, [target]: [string], { form }: { form: Record<string, unknown> }): string | boolean => {
      if (!target) {
        return 'Le champ de confirmation est manquant.'
      }

      if (!form[target]) {
        return `Impossible de trouver le champ correspondant : ${target}`
      }

      return value === form[target] ? true : 'Les mots de passe ne correspondent pas.'
    },
  )

  /**
   * Règle personnalisée pour les valeurs numériques.
   * @param {string | number} value - La valeur à valider.
   * @param {Record<string, any>} [params={}] - Paramètres optionnels.
   * @returns {boolean | string} `true` si valide, sinon un message d'erreur.
   */
  defineRule('numeric', (value: string | number, params: Record<string, any> = {}): boolean | string => {
    return numeric(value) ? true : params.message || 'Le champ doit être un nombre valide.'
  })

  /**
   * Règle personnalisée pour la validation des mots de passe complexes.
   * @param {string} value - Le mot de passe à valider.
   * @returns {boolean | string} `true` si valide, sinon un message d'erreur.
   */
  defineRule('complex_password', (value: string): boolean | string => {
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])[A-Za-z\d\S]{8,}$/
    return passwordRegex.test(value)
      ? true
      : 'Le mot de passe doit comporter au moins 8 caractères, inclure un chiffre, une majuscule et un caractère spécial.'
  })

  /**
   * Règle personnalisée pour la validation des prix.
   * @param {string} value - La valeur à valider.
   * @returns {boolean | string} `true` si valide, sinon un message d'erreur.
   */
  defineRule('price_format', (value: string): boolean | string => {
    const priceRegex: RegExp = /^[0-9]+([.,][0-9]{1,2})?$/
    return priceRegex.test(value) ? true : 'Le champ prix doit être un nombre valide avec un maximum de deux décimales.'
  })
}

/**
 * Configure la localisation des messages d'erreur.
 * @returns {void}
 */
const setupLocalization: () => void = (): void => {
  localize({
    en,
    fr,
  })

  configure({
    generateMessage: localize('fr', {
      names: {},
    }),
  })
}
