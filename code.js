figma.showUI(__html__, { width: 320, height: 480 });

let selectionArr = figma.currentPage.selection;

figma.ui.onmessage = msg => {
    if (msg.inputData) {
        if (selectionArr[0]) {
            if (figma.currentPage.selection[0].type != 'TEXT') {
                figma.notify('📌 Select text layers', { timeout: 1 })
            }
        } else {
            figma.notify('📌 Select text layers', { timeout: 1 })
        }

        figma.on('selectionchange', () => {
            if (figma.currentPage.selection[0]) {
                if (figma.currentPage.selection[0].type === 'TEXT') {
                    selectionArr = []
                    if (figma.currentPage.selection.length > 0) {
                        figma.currentPage.selection.forEach(item => {
                            selectionArr.push(item)
                        })
                    } else {
                        selectionArr = figma.currentPage.selection[0]
                    }
                }
                else {
                    figma.notify('📌 Select text layers', { timeout: 1 })
                }
            }
        })

        async function nodeFont(nodeItem) {
            await figma.loadFontAsync(nodeItem.fontName)
            nodeItem.characters = msg.inputData;
            selectionArr = []
        }

        selectionArr.forEach(node => {

            if (node.lenth > 0) {

                node.forEach(item => {
                    nodeFont(item)
                })
            } else {
                nodeFont(node)
            }
        });

    } else {
        figma.notify('🤷 No data', { timeout: 1 })
    }

};