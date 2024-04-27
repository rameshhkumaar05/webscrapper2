$(document).ready(function() {
    $('#searchForm').submit(async function (event) {
        event.preventDefault();

        const url = $('#url').val();
        const selector = $('#selector').val();
        const filter = $('#filter').val();

        console.log(url,selector,filter)
        const response = await fetch('/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, selector, filter })
        });
        const data = await response.json(200);

        // $.ajax({
        //     url: '/scrape',
        //     method: 'POST',
        //     data: { url, selector, filter },
        //     success: function(response) {
        //         if (response.success) {
        //             displayResults(response.data);
        //         } else {
        //             alert('An error occurred while scraping the website');
        //         }
        //     },
        //     error: function() {
        //         alert('An error occurred while fetching data');
        //     }
        // });
    });

    function displayResults(data) {
        const resultsDiv = $('#results');
        resultsDiv.empty();

        if (data.length === 0) {
            resultsDiv.html('<p>No results found.</p>');
            return;
        }

        const table = $('<table>');
        const headerRow = $('<tr>');
        const headerCell = $('<th>').text('Data');
        headerRow.append(headerCell);
        table.append(headerRow);

        data.forEach(item => {
            const row = $('<tr>');
            const cell = $('<td>').text(item);
            row.append(cell);
            table.append(row);
        });

        resultsDiv.append(table);
    }
});
