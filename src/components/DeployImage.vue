<script setup lang="ts">
defineProps<{
  modelValue: string
}>();
const handleVersionChange = (): void => {
  console.log("我是发布组件")
};
// 必须使用 defineExpose 暴露方法
defineExpose({
  handleVersionChange
});
</script>

<template>
  <div class="deploy-image-container">
    <span>待发布镜像为：{{ modelValue || '未选择' }}</span>
  </div>
</template>

<style scoped>
.deploy-image-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>