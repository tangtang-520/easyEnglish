const isLoginDialogVisible = ref(false);

const open = () => (isLoginDialogVisible.value = true);

const close = () => (isLoginDialogVisible.value = false);

export function useLoginDialog() {
  return { isLoginDialogVisible, open, close };
}
