<template>
  <span class="font-bold text-red-500 text-2xl font-mono" data-testid="timer">{{ pad(timer.minutes) }}<span class="animate-blink">:</span>{{ pad(timer.seconds) }}</span>
</template>

<script lang="ts" setup>
import { useTimer } from 'vue-timer-hook';

const props = defineProps<{
  expiresAt: Date,
}>();

const pad = (n: Ref<number>): string => {
  return n.value < 10 ? '0'+n.value : ''+n.value;
}

const timer = useTimer(props.expiresAt.getTime(), true);

onMounted(() => {
  watchEffect(async () => {
    if(timer.isExpired.value) {
      await navigateTo('/timeout');
    }
  })
})
</script>