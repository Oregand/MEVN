<template>
</template>
<script>
import { setAccessToken, setIdToken } from '@/services/UserService';

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      window.location.href = '/';
    });
  },
};
</script>