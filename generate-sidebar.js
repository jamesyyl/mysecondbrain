const fs = require('fs');
const path = require('path');

// 项目根目录
const rootDir = './'; // 修改为你的 Docsify 文档目录

// 忽略的文件或目录
const ignored = ['node_modules', '.git', '_sidebar.md', '_navbar.md', 'index.html'];

/**
 * 递归遍历目录，获取子目录及 Markdown 文件
 */
function walk(dir) {
  let results = { directories: [], markdownFiles: [] };
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (ignored.includes(file)) return;
    if (stat && stat.isDirectory()) {
      results.directories.push(filePath);
      const subResults = walk(filePath);
      results.directories = results.directories.concat(subResults.directories);
      results.markdownFiles = results.markdownFiles.concat(subResults.markdownFiles);
    } else if (file.endsWith('.md')) {
      results.markdownFiles.push(filePath);
    }
  });

  return results;
}

/**
 * 生成根目录的 _sidebar.md
 */
function generateRootSidebar(directories) {
  const links = directories.map((dir) => {
    const relativeDir = path.relative(rootDir, dir);
    const link = relativeDir.replace(/\\/g, '/'); // 兼容 Windows 的路径分隔符
    const dirName = path.basename(dir);
    return `- [${dirName}](/${link}/README.md)`;
  });
  return links.join('\n');
}

/**
 * 生成子目录的 _sidebar.md
 */
function generateSubSidebar(files, currentDir) {
  const links = files.map((file) => {
    const relativePath = path.relative(rootDir, file); // 相对于根目录的路径
    const relativeToDir = path.relative(currentDir, file); // 相对于子目录的路径
    const link = relativePath.replace(/\\/g, '/'); // 使用完整路径，包含子目录名
    const fileName = path.basename(relativeToDir, '.md'); // 提取文件名
    return `- [${fileName}](/${link})`;
  });
  return links.join('\n');
}

/**
 * 扫描目录并生成 _sidebar.md 文件
 */
function generateSidebars() {
  const { directories, markdownFiles } = walk(rootDir);

  // 生成根目录的 _sidebar.md
  const rootSidebarContent = generateRootSidebar(directories);
  fs.writeFileSync(path.join(rootDir, '_sidebar.md'), rootSidebarContent, 'utf8');
  console.log(`Root sidebar generated at: ${path.join(rootDir, '_sidebar.md')}`);

  // 遍历子目录，生成各自的 _sidebar.md
  directories.forEach((dir) => {
    const subFiles = markdownFiles.filter((file) => file.startsWith(dir));
    const subSidebarContent = generateSubSidebar(subFiles, dir);
    fs.writeFileSync(path.join(dir, '_sidebar.md'), subSidebarContent, 'utf8');
    console.log(`Sidebar generated for directory: ${dir}`);
  });
}

// 执行生成脚本
generateSidebars();
