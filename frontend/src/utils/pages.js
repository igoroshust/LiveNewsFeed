// Вспомогательные данные (форматирование, работа со строками, номерами страниц)

export const getPageCount = (totalCount, limit) => { // аргумент - общее количество элементов
    return Math.ceil(totalCount / limit) // возвращает необходимое количество страниц, округлив в большую сторону
}

// Функционал по заполнению массива
export const getPagesArray = (totalPages) => {
    let result = []
    for (let i = 0; i < totalPages; i++) { // заполняем массив на основании общего количества страниц
        result.push(i + 1)
    }
    return result;
}