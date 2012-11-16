define(["kendo", "config"], function (kendo, config) {
    var _wcfSchemaData = function (data) {
            return data.value;
        },

        _wcfSchemaTotal = function (data) {
            return data["odata.count"];
        };

    return {
        genresList: new kendo.data.DataSource({
            type: "odata",
            serverPaging: true,
            serverSorting: true,
            pageSize: 20,
            transport: {
                read: config.genresUrl,
            },
            sort: {
                field: "Name",
                dir: "asc"
            },
            schema: {
                data: _wcfSchemaData,
                total: _wcfSchemaTotal
            }
        }),

        artistsStartingWith: function (filter) {
            return new kendo.data.DataSource({
                type: "odata",
                serverSorting: true,
                serverFiltering: true,
                transport: {
                    read: config.artistsUrl,
                },
                filter: {
                    field: "Name",
                    operator: "startswith",
                    value: filter
                },
                sort: {
                    field: "Name",
                    dir: "asc"
                },
                schema: {
                    data: _wcfSchemaData,
                    total: _wcfSchemaTotal
                }
            });
        },

        albumsFor: function (filter) {
            return new kendo.data.DataSource({
                type: "odata",
                serverSorting: true,
                serverPaging: true,
                serverFiltering: true,
                pageSize: 20,
                transport: {
                    read: config.albumsUrl + "?$expand=Artist",
                },
                filter: filter,
                sort: {
                    field: "Title",
                    dir: "asc"
                },
                schema: {
                    data: _wcfSchemaData,
                    total: _wcfSchemaTotal
                }
            });
        }
    }
});