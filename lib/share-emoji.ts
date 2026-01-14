// 将 emoji 渲染为图片文件
export async function emojiToImageFile(
  emojiString: string,
  options?: { size?: number; backgroundColor?: string; fontSize?: number },
): Promise<File | null> {
  try {
    const size = options?.size ?? 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("[share-emoji] Failed to get canvas context");
      return null;
    }

    // 背景
    ctx.fillStyle = options?.backgroundColor ?? "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // 绘制 emoji
    const fontSize = options?.fontSize ?? size * 0.7;
    ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000";
    ctx.fillText(emojiString, size / 2, size / 2);

    // 转换为 dataURL 再通过 fetch 转换为 blob（参考代码模式）
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await (await fetch(dataUrl)).blob();

    console.log("[share-emoji] Blob created:", blob.size, blob.type);

    return new File([blob], "emoji.png", {
      type: "image/png",
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("[share-emoji] Error creating emoji file:", error);
    return null;
  }
}

// 检查是否支持 Web Share API
export function canShareFiles(): boolean {
  return (
    typeof navigator !== "undefined" && typeof navigator.share === "function"
  );
}

// Web Share API 分享函数
export async function shareEmoji(
  emojiString: string,
  title: string,
  text: string,
  url?: string,
): Promise<boolean> {
  // 检查是否支持 Web Share
  if (!canShareFiles()) {
    console.log("[share-emoji] Web Share not supported");
    return false;
  }

  // 创建 emoji 图片文件
  const file = await emojiToImageFile(emojiString);
  if (!file) {
    console.log("[share-emoji] Failed to create emoji file");
    return false;
  }

  console.log("[share-emoji] File created:", file.name, file.size, file.type);

  // 直接分享（参考代码模式）
  const shareData: ShareData & { files: File[] } = {
    title,
    text,
    url,
    files: [file],
  };

  try {
    await navigator.share(shareData);
    console.log("[share-emoji] Share success");
    return true;
  } catch (error) {
    console.log("[share-emoji] Share error:", error);
    // 降级：仅分享文本/URL
    try {
      await navigator.share({ title, text, url });
      console.log("[share-emoji] Fallback share success");
      return true;
    } catch {
      console.log("[share-emoji] Fallback share failed");
    }
  }

  return false;
}
