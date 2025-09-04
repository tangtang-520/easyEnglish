<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeftRight, Copy, Volume2, RotateCcw, Languages } from 'lucide-vue-next'

const sourceText = ref('')
const translatedText = ref('')
const sourceLang = ref('auto')
const targetLang = ref('zh')
const isTranslating = ref(false)

const languages = [
  { code: 'auto', name: '自动检测' },
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'ru', name: 'Русский' },
  { code: 'ar', name: 'العربية' }
]

const wordCount = computed(() => sourceText.value.length)

const swapLanguages = () => {
  if (sourceLang.value !== 'auto') {
    const temp = sourceLang.value
    sourceLang.value = targetLang.value
    targetLang.value = temp
    
    const tempText = sourceText.value
    sourceText.value = translatedText.value
    translatedText.value = tempText
  }
}

const translateText = async () => {
  if (!sourceText.value.trim()) return
  
  isTranslating.value = true
  // 模拟翻译API调用
  setTimeout(() => {
    translatedText.value = `翻译结果: ${sourceText.value}`
    isTranslating.value = false
  }, 1000)
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 这里可以添加toast提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const clearAll = () => {
  sourceText.value = ''
  translatedText.value = ''
}

const speakText = (text: string, lang: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    speechSynthesis.speak(utterance)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- 页面标题 -->
    <div class="text-center mb-8">
      <div class="flex items-center justify-center gap-2 mb-4">
        <Languages class="h-8 w-8 text-primary" />
        <h1 class="text-3xl font-bold">智能翻译</h1>
      </div>
      <p class="text-muted-foreground">支持多种语言互译，快速准确的翻译体验</p>
    </div>

    <!-- 语言选择器 -->
    <Card class="mb-6">
      <CardContent class="pt-6">
        <div class="flex items-center justify-center gap-4">
          <div class="flex-1 max-w-xs flex items-center justify-center">
            <Select v-model="sourceLang" >
              <SelectTrigger>
                <SelectValue placeholder="选择源语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem 
                  v-for="lang in languages" 
                  :key="lang.code" 
                  :value="lang.code"
                >
                  {{ lang.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            @click="swapLanguages"
            :disabled="sourceLang === 'auto'"
            class="shrink-0"
          >
            <ArrowLeftRight class="h-4 w-4" />
          </Button>
          
          <div class="flex-1 max-w-xs flex items-center justify-center">
            <Select v-model="targetLang">
              <SelectTrigger>
                <SelectValue placeholder="选择目标语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem 
                  v-for="lang in languages.filter(l => l.code !== 'auto')" 
                  :key="lang.code" 
                  :value="lang.code"
                >
                  {{ lang.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 翻译区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- 源文本输入 -->
      <Card>
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <CardTitle class="text-lg">原文</CardTitle>
            <Badge variant="secondary">{{ wordCount }}/5000</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            v-model="sourceText"
            placeholder="请输入要翻译的文本..."
            class="min-h-[200px] resize-none border-0 p-0 focus-visible:ring-0"
            maxlength="5000"
          />
          <Separator class="my-4" />
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                @click="speakText(sourceText, sourceLang)"
                :disabled="!sourceText.trim()"
              >
                <Volume2 class="h-4 w-4 mr-1" />
                朗读
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                @click="copyToClipboard(sourceText)"
                :disabled="!sourceText.trim()"
              >
                <Copy class="h-4 w-4 mr-1" />
                复制
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              @click="clearAll"
            >
              <RotateCcw class="h-4 w-4 mr-1" />
              清空
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- 翻译结果 -->
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-lg">译文</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="min-h-[200px] p-3 rounded-md">
            <div v-if="isTranslating" class="flex items-center justify-center h-full">
              <div class="flex items-center gap-2 text-muted-foreground">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                翻译中...
              </div>
            </div>
            <div v-else-if="translatedText" class="whitespace-pre-wrap">
              {{ translatedText }}
            </div>
            <div v-else class="text-muted-foreground text-center h-full flex items-center justify-center">
              翻译结果将显示在这里
            </div>
          </div>
          <Separator class="my-4" />
          <div class="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              @click="speakText(translatedText, targetLang)"
              :disabled="!translatedText.trim()"
            >
              <Volume2 class="h-4 w-4 mr-1" />
              朗读
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              @click="copyToClipboard(translatedText)"
              :disabled="!translatedText.trim()"
            >
              <Copy class="h-4 w-4 mr-1" />
              复制
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 翻译按钮 -->
    <div class="text-center">
      <Button 
        @click="translateText"
        :disabled="!sourceText.trim() || isTranslating"
        size="lg"
        class="px-8"
      >
        <div v-if="isTranslating" class="flex items-center gap-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          翻译中...
        </div>
        <span v-else>开始翻译</span>
      </Button>
    </div>

    <!-- 快捷功能提示 -->
    <Card class="mt-8">
      <CardHeader>
        <CardTitle class="text-lg">使用提示</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            支持多种语言自动检测
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            一键复制翻译结果
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            支持语音朗读功能
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
