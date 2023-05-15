const data = [
    {
        "title": "Day of the Dragon",
        "author": "Richard A. Knaak",
        "quantity": 10,
        "unit_price": 9,
        "total_value": null
    },
    {
        "title": "A Wizard of Earthsea",
        "author": "Ursula K. Le Guin",
        "quantity": null,
        "unit_price": 10,
        "total_value": 40
    },
    {
        "title": "Homeland",
        "author": "Robert A. Salvatore",
        "quantity": 8,
        "unit_price": null,
        "total_value": 96
    },
    {
        "title": "Canticle",
        "author": "Robert A. Salvatore",
        "quantity": 13,
        "unit_price": 23,
        "total_value": null
    },
    {
        "title": "Gamedec. Granica rzeczywistości",
        "author": "Marcin Przybyłek",
        "quantity": null,
        "unit_price": 25,
        "total_value": 50
    },
    {
        "title": "The Night Has Come",
        "author": "Stephen King",
        "quantity": 30,
        "unit_price": null,
        "total_value": 900
    },
    {
        "title": "The Sphinx",
        "author": "Graham Masterton",
        "quantity": 3,
        "unit_price": null,
        "total_value": 300
    },
    {
        "title": "Charnel House",
        "author": "Graham Masterton",
        "quantity": null,
        "unit_price": 20,
        "total_value": 60
    },
    {
        "title": "The Devils of D-Day",
        "author": "Graham Masterton",
        "quantity": 10,
        "unit_price": 16,
        "total_value": null
    }
];
const metadata = [
    {
        "id": "title",
        "type": "string",
        "label": "Title"
    },
    {
        "id": "author",
        "type": "string",
        "label": "Author"
    },
    {
        "id": "quantity",
        "type": "number",
        "label": "Quantity"
    },
    {
        "id": "unit_price",
        "type": "number",
        "label": "Unit price"
    },
    {
        "id": "total_value",
        "type": "number",
        "label": "Total (Quantity * Unit price)"
    }
];

const additionalDataFromBooksDB = [
    {
        "title": "Day of the Dragon",
        "author": "Richard A. Knaak",
        "genre": "fantasy",
        "pages": 378,
        "rating": 3.81,
    },
    {
        "title": "A Wizard of Earthsea",
        "author": "Ursula K. Le Guin",
        "genre": "fantasy",
        "pages": 183,
        "rating": 4.01,
    },
    {
        "title": "Homeland",
        "author": "Robert A. Salvatore",
        "genre": "fantasy",
        "pages": 343,
        "rating": 4.26,
    },
    {
        "title": "Canticle",
        "author": "Robert A. Salvatore",
        "genre": "fantasy",
        "pages": 320,
        "rating": 4.03,
    },
    {
        "title": "Gamedec. Granica rzeczywistości",
        "author": "Marcin Przybyłek",
        "genre": "cyberpunk",
        "pages": 364,
        "rating": 3.89,
        
    },
    {
        "title": "The Night Has Come",
        "author": "Stephen King",
        "genre": "post apocalyptic",
        "pages": 186,
        "rating": 4.55,
    },
    {
        "title": "The Sphinx",
        "author": "Graham Masterton",
        "genre": "horror",
        "pages": 207,
        "rating": 3.14,
    },
    {
        "title": "Charnel House",
        "author": "Graham Masterton",
        "genre": "horror",
        "pages": 123,
        "rating": 3.61,
        
    },
    {
        "title": "The Devils of D-Day",
        "author": "Graham Masterton",
        "genre": "horror",
        "pages": 243,
        "rating": "3.62",
    }
]
const additionalMetadataFromBooksDB = [
    {
        "id": "title",
        "type": "string",
        "label": "Title"
    },
    {
        "id": "author",
        "type": "string",
        "label": "Author"
    },
    {
        "id": "genre",
        "type": "string",
        "label": "Genre"
    },
    {
        "id": "pages",
        "type": "number",
        "label": "Pages"
    },
    {
        "id": "rating",
        "type": "number",
        "label": "Rating"
    }
];

const searchInputElement = document.body.querySelector('input.search-input');
const searchButtonElement = document.body.querySelector('button.search-go');
const searchResetElement = document.body.querySelector('button.search-reset');

const columnHideElement = document.body.querySelector('button.column-hide');
const columnShowElement = document.body.querySelector('button.column-show');
const columnResetElement = document.body.querySelector('button.column-reset');

const markButtonElement = document.body.querySelector('button.function-mark');
const fillButtonElement = document.body.querySelector('button.function-fill');
const countButtonElement = document.body.querySelector('button.function-count');
const computeTotalsButtonElement = document.body.querySelector('button.function-totals');
const resetFunctionButtonElement = document.body.querySelector('button.function-reset');

class SummaryTable {
    constructor(data) {
        this.data = data;
        this.authorsData = this.computeSummaryData();
        this.createTable();
    }

    computeSummaryData() {
        let authorsData = {};
        this.data.forEach(book => {
            if (!authorsData[book.author]) {
                authorsData[book.author] = {
                    titles: new Set(),
                    totalQuantity: 0,
                    totalRevenue: 0,
                    totalUnitPrice: 0
                };
            }
            authorsData[book.author].titles.add(book.title);
            authorsData[book.author].totalQuantity += book.quantity || 0;
            authorsData[book.author].totalRevenue += book.total_value || 0;
            authorsData[book.author].totalUnitPrice += book.unit_price || 0;
        });
        return authorsData;
    }

    createTable() {
        let table = document.createElement('table');
        let thead = table.createTHead();
        let tbody = table.createTBody();

        this.createHeader(thead);
        this.fillData(tbody);

        document.body.appendChild(table);
    }

    createHeader(thead) {
        let headerRow = thead.insertRow();
        ['Author', 'Titles Count', 'Total Quantity', 'Total Revenue', 'Average Quantity', 'Average Unit Price'].forEach(text => {
            let th = document.createElement('th');
            th.innerText = text;
            headerRow.appendChild(th);
        });
    }

    fillData(tbody) {
        for (let author in this.authorsData) {
            let row = tbody.insertRow();
            let authorData = this.authorsData[author];

            row.insertCell().innerText = author;
            row.insertCell().innerText = authorData.titles.size;
            row.insertCell().innerText = authorData.totalQuantity;
            row.insertCell().innerText = authorData.totalRevenue;
            row.insertCell().innerText = (authorData.totalQuantity / authorData.titles.size).toFixed(2);
            row.insertCell().innerText = (authorData.totalUnitPrice / authorData.titles.size).toFixed(2);
        }
    }
}

class Grid {
    constructor(data, metadata) {
        this.metadata = [...metadata]

        // Merge data
        this.data = [...data]

        // HINT: below map can be useful for view operations ;))
        this.dataViewRef = new Map();

        Object.freeze(this.data);
        Object.freeze(this.metadata);

        this.render();
        this.live();
    }

    render() {
        this.table = document.createElement('table');

        this.head = this.table.createTHead();
        this.body = this.table.createTBody();

        this.renderHead();
        this.renderBody();

        document.body.append(this.table);
    }

    renderHead() {
        const row = this.head.insertRow();

        for (const column of this.metadata) {
            const cell = row.insertCell();
            cell.classList.add(column.type, column.id);

            cell.innerText = column.label;
        }
    }

    renderBody() {
        for (const dataRow of this.data) {
            const row = this.body.insertRow();

            for (const column of this.metadata) {
                const cell = row.insertCell();

                cell.classList.add(column.type, column.id);
                cell.innerText = dataRow[column.id];
            }

            // connect data row reference with view row reference
            this.dataViewRef.set(dataRow, row);
            console.log(this.dataViewRef, this.data);
        }
    }

    live() {
        searchButtonElement.addEventListener('click', this.onSearchGo.bind(this));
        searchInputElement.addEventListener('keydown', this.onSearchChange.bind(this));
        searchResetElement.addEventListener('click', this.onSearchReset.bind(this));

        columnHideElement.addEventListener('click', this.onColumnHideClick.bind(this));
        columnShowElement.addEventListener('click', this.onColumnShowClick.bind(this));
        columnResetElement.addEventListener('click', this.onColumnReset.bind(this));

        markButtonElement.addEventListener('click', this.onMarkEmptyClick.bind(this));
        fillButtonElement.addEventListener('click', this.onFillTableClick.bind(this));
        countButtonElement.addEventListener('click', this.onCountEmptyClick.bind(this));
        computeTotalsButtonElement.addEventListener('click', this.onComputeTotalsClick.bind(this));
        resetFunctionButtonElement.addEventListener('click', this.onFunctionsResetClick.bind(this));
    }

    onSearchGo() {
        let searchTerm = searchInputElement.value.toLowerCase();
        this.dataViewRef.forEach((row, dataRow) => {
            row.style.display = Object.values(dataRow).some(value => 
                value && value.toString().toLowerCase().includes(searchTerm)) ? '' : 'none';
        });
    }

    onSearchChange(event) {
        if (event.key === 'Enter') {
            this.onSearchGo();
        }
    }

    onSearchReset() {
        searchInputElement.value = '';
        this.onSearchGo();
    }

    onColumnHideClick() {
        let visibleColumns = Array.from(this.head.rows[0].cells).filter(cell => cell.style.display !== 'none');
        if (visibleColumns.length) {
            let columnIndex = visibleColumns[0].cellIndex;
            for (let row of this.table.rows) {
                row.cells[columnIndex].style.display = 'none';
            }
        }
    }

    onColumnShowClick() {
        let hiddenColumns = Array.from(this.head.rows[0].cells).filter(cell => cell.style.display === 'none');
        if (hiddenColumns.length) {
            let columnIndex = hiddenColumns[0].cellIndex;
            for (let row of this.table.rows) {
                row.cells[columnIndex].style.display = '';
            }
        }
    }

    onColumnReset() {
        for (let row of this.table.rows) {
            for (let cell of row.cells) {
                cell.style.display = '';
            }
        }
    }

    onMarkEmptyClick() {
        for (let row of this.body.rows) {
            for (let cell of row.cells) {
                if (cell.classList.contains('number') && !cell.innerText) {
                    cell.classList.add('bordered');
                }
            }
        }
    }

    onFillTableClick() {
        this.dataViewRef.forEach((row, dataRow) => {
            let totalValueCell, quantityCell, unitPriceCell;
    
            if (dataRow['quantity'] && dataRow['unit_price']) {
                if (!dataRow['total_value']) {
                    let newTotal = dataRow['quantity'] * dataRow['unit_price'];
                    totalValueCell = Array.from(row.cells).find(cell => cell.classList.contains('total_value'));
                    totalValueCell.innerText = newTotal;
                }
            } else if (dataRow['total_value']) {
                if (!dataRow['quantity'] && dataRow['unit_price']) {
                    let newQuantity = dataRow['total_value'] / dataRow['unit_price'];
                    quantityCell = Array.from(row.cells).find(cell => cell.classList.contains('quantity'));
                    quantityCell.innerText = newQuantity;
                }
                if (!dataRow['unit_price'] && dataRow['quantity']) {
                    let newUnit = dataRow['total_value'] / dataRow['quantity'];
                    unitPriceCell = Array.from(row.cells).find(cell => cell.classList.contains('unit_price'));
                    unitPriceCell.innerText = newUnit;
                }
            }
        });

        console.log(this.dataViewRef, this.data);
    }

    onCountEmptyClick() {
        let emptyCount = 0;
        for (let row of this.body.rows) {
            for (let cell of row.cells) {
                if (cell.classList.contains('number') && !cell.innerText) {
                    emptyCount++;
                }
            }
        }
        alert(`Total empty numeric cells: ${emptyCount}`);
    }

    onComputeTotalsClick() {
        let lastVisibleNumericColumns = Array.from(this.head.rows[0].cells)
            .filter(cell => cell.style.display !== 'none' && cell.classList.contains('number'));
        if (lastVisibleNumericColumns.length === 0) {
            alert("No visible numeric columns found.");
            return;
        }
        let lastVisibleNumericColumnId = lastVisibleNumericColumns.pop().classList[1];
        let total = this.data.reduce((acc, dataRow) => acc + (dataRow[lastVisibleNumericColumnId] || 0), 0);
        alert(`Total of last visible numeric column: ${total}`);
    }

    onFunctionsResetClick() {
        this.onSearchReset();
        this.onColumnReset();
    
        this.dataViewRef.forEach((row, dataRow) => {
            Array.from(row.cells).forEach((cell, index) => {
                cell.classList.remove('bordered');
                cell.innerText = this.data[this.data.indexOf(dataRow)][this.metadata[index].id];
            });
        });
    }

}
// Uncomment this line if you want to test original table
//new Grid(data, metadata);
// Remove repeating columns from additionalMetadataFromBooksDB
const additionalMetadataFromBooksDBFiltered = additionalMetadataFromBooksDB.filter(
    column => !metadata.some(meta => meta.id === column.id)
  );
  
  
  // Merge metadata
const mergedMetadata = [...metadata, ...additionalMetadataFromBooksDBFiltered];
  
  // Merge data
const mergedData = data.map(item => {
    let additionalData = additionalDataFromBooksDB.find(ad => ad.title === item.title && ad.author === item.author);
    return {...item, ...additionalData};
  });
new Grid(mergedData, mergedMetadata);
new SummaryTable(data);