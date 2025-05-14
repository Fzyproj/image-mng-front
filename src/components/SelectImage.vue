<template>
  <div style="display: flex;flex-direction: column; row-gap: 16px">
    <a-form class="from-center" ref="formRef" :model="formData">
      <a-form-item
          label="镜像名"
          name="repoName"
          :rules="[{ required: true, message: '镜像名不能为空' }]"
      >
        <a-input v-model:value="formData.repoName" placeholder="请输入镜像名" style="width: 650px" allow-clear/>
      </a-form-item>

      <a-form-item
          label="版本号"
          name="version"
          :rules="[{ required: true, message: '版本号不能为空' }]"
      >
        <a-input v-model:value="formData.version" placeholder="请输入版本号" style="width: 150px" allow-clear/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {FormInstance} from "ant-design-vue";

const props = defineProps<{
  modelValue: string
}>();

const formData = ref({
  repoName: ref<string | undefined>(props.modelValue.split(':')[0] ?? ''),
  version: ref<string | undefined>(props.modelValue.split(':')[1] ?? ''),
});
const formRef = ref<FormInstance>();

// 通知父组件更新元素值
const emit = defineEmits<{
  (event: string, value: string): void
}>();

const validateFrom = async () => {
  try {
    await formRef.value?.validateFields();
    console.log('校验通过');
    return true;
  } catch (errorInfo) {
    console.log('校验失败:');
    return false;
  }
};

const handleVersionChange = (): void => {
  emit('update:modelValue',formData.value.repoName + ':' + formData.value.version || '');
};

// 必须使用 defineExpose 暴露方法
defineExpose({
  handleVersionChange,
  validateFrom
});

</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
}

.label {
  width: 300px;
  text-align: right;
  margin-right: 8px;
}

.from-center {
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
}
</style>