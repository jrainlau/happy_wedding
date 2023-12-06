import { ref } from 'vue';

export function useSetup() {
  const urlParams = new URLSearchParams(window.location.search)
  const topicId = ref(urlParams.get('topicId'))
  const isEditMode = ref(urlParams.get('mode') === 'edit')

  return {
    topicId,
    isEditMode,
  };
}
