/*
 * @Description: 生成随机颜色
 * @Author: cg
 * @Date: 2024-08-30 16:52:57
 * @LastEditors: cg
 * @LastEditTime: 2024-09-19 14:48:41
 */
export function getRandomColor() {
  // 随机色相值（0到360）
  const hue = Math.floor(Math.random() * 360)
  // 饱和度（0%到100%），这里选择较高的饱和度
  const saturation = 50 + Math.floor(Math.random() * 50) // 50%到100%
  // 亮度（0%到100%），避免极端值以保持可读性
  const lightness = 20 + Math.floor(Math.random() * 60) // 20%到80%

  // 将HSL值转换为RGB字符串
  const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  return hsl
}
