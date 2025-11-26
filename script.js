// 1. 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS 动画
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });
    console.log("JS Loaded successfully!"); // 在控制台打印，证明JS跑通了
});

// --- 模态框逻辑 ---

// 2. 获取 HTML 元素
const modal = document.getElementById('pdfModal');
const pdfFrame = document.getElementById('pdfFrame');
const modalTitle = document.getElementById('modalTitle');

// 3. 定义打开函数 (必须挂载到 window 对象上，HTML 里的 onclick 才能看见它)
window.openModal = function(title, pdfPath) {
    console.log("试图打开 PDF:", title, pdfPath); // 调试信息

    if (!modal) {
        console.error("❌ 找不到模态框元素 (id='pdfModal')，请检查 HTML 底部是否添加了模态框代码！");
        return;
    }

    modalTitle.textContent = title;
    pdfFrame.src = pdfPath;

    modal.style.display = 'flex';
    // 强制浏览器重绘，确保过渡动画生效
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

// 4. 定义关闭函数
window.closeModal = function() {
    if (!modal) return;

    modal.classList.remove('active');

    setTimeout(() => {
        modal.style.display = 'none';
        pdfFrame.src = ''; // 清空 PDF，停止占用资源
    }, 300);

    document.body.style.overflow = 'auto'; // 恢复滚动
}

// 5. 添加辅助关闭功能 (点击遮罩层关闭、按ESC关闭)
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            window.closeModal();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        window.closeModal();
    }
});