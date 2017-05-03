'use strict';

var lifeApp = angular.module('lifeApp', []);

lifeApp.controller('ViewCtrl', ViewCtrl);

function ViewCtrl ($scope, $timeout) {

    $scope.gameBoard = [];
    $scope.nextGameBoard = [];
    $scope.gridRows= 8;
    $scope.gridColumns= 6;

    $scope.update = function () {
        for (var i = 0; i < $scope.gridColumns; i++) {
            $scope.gameBoard.push([i]);
            $scope.createRows(i);
        }
    };

    $scope.createRows = function(num) {
        for (var i = 0; i < $scope.gridRows; i++) {
            $scope.gameBoard[num][i] = false;
        }
    };

    //updates the gameBoard when user selects checkbox
    $scope.updateArray = function(col, row, bool){
        $scope.gameBoard[col][row] = !bool;
    };

    //creates a copy of gameBoard when user clicks "next stage" button starts the array update
    $scope.nextStage = function() {
        $scope.gameBoard.map(function (array, i) {
            $scope.nextGameBoard[i] = array.slice(0);
            $scope.liveOrDie(array, i);
        });
    };
    
    $scope.liveOrDie = function (array, col) {
        array.map(function (bool, i) {
            var numNeighbors = $scope.checkNeighbors(col, i);
            if (numNeighbors === 3) {
                $scope.nextGameBoard[col][i] = true;
            } else if (numNeighbors === 2) {
                //do nothing
            } else {
                $scope.nextGameBoard[col][i] = false;
            }
            if (col === $scope.gridColumns - 1 && i === $scope.gridRows - 1){
                $timeout(function () {
                    $scope.updateGameBoard();
                }, 200);
            }
        });
    };

    $scope.updateGameBoard = function () {
        $scope.gameBoard = $scope.nextGameBoard;
        $scope.nextGameBoard = [];
    };

    $scope.checkNeighbors = function (col, row) {
        $scope.neighborhood = {};
        var numNeighbors = 0;

        //get cells neighbors

        // based on a cell that should have 8 neighbors (not a border cell)
        if ((row > 0 && row < $scope.gridRows - 1) && (col > 0 && col < $scope.gridColumns - 1)) {
            $scope.neighborhood.upLeft = $scope.gameBoard[col-1][row-1];
            $scope.neighborhood.upCenter = $scope.gameBoard[col][row-1];
            $scope.neighborhood.upRight = $scope.gameBoard[col+1][row-1];
            $scope.neighborhood.downLeft = $scope.gameBoard[col-1][row+1];
            $scope.neighborhood.downCenter = $scope.gameBoard[col][row+1];
            $scope.neighborhood.downRight = $scope.gameBoard[col+1][row+1];
            $scope.neighborhood.left = $scope.gameBoard[col-1][row];
            $scope.neighborhood.right = $scope.gameBoard[col+1][row];

        // based on a border cell that should have 5 neighbors
        } else if (col === 0 && (row > 0 && row < $scope.gridRows - 1)) { //check the borders and not the corners
            $scope.neighborhood.upCenter = $scope.gameBoard[col][row-1];
            $scope.neighborhood.upRight = $scope.gameBoard[col+1][row-1];
            $scope.neighborhood.downCenter = $scope.gameBoard[col][row+1];
            $scope.neighborhood.downRight = $scope.gameBoard[col+1][row+1];
            $scope.neighborhood.right = $scope.gameBoard[col+1][row];
        } else if (col === $scope.gridColumns - 1 && (row > 0 && row < $scope.gridRows - 1)) {
            $scope.neighborhood.upLeft = $scope.gameBoard[col-1][row-1];
            $scope.neighborhood.upCenter = $scope.gameBoard[col][row-1];
            $scope.neighborhood.downLeft = $scope.gameBoard[col-1][row+1];
            $scope.neighborhood.downCenter = $scope.gameBoard[col][row+1];
            $scope.neighborhood.left = $scope.gameBoard[col-1][row];
        } else if (row === 0 && (col > 0 && col < $scope.gridColumns - 1)) {
            $scope.neighborhood.downLeft = $scope.gameBoard[col-1][row+1];
            $scope.neighborhood.downCenter = $scope.gameBoard[col][row+1];
            $scope.neighborhood.downRight = $scope.gameBoard[col+1][row+1];
            $scope.neighborhood.left = $scope.gameBoard[col-1][row];
            $scope.neighborhood.right = $scope.gameBoard[col+1][row];
        } else if (row === $scope.gridRows - 1 && (col > 0 && col < $scope.gridColumns - 1)) {
            $scope.neighborhood.upLeft = $scope.gameBoard[col-1][row-1];
            $scope.neighborhood.upCenter = $scope.gameBoard[col][row-1];
            $scope.neighborhood.upRight = $scope.gameBoard[col+1][row-1];
            $scope.neighborhood.left = $scope.gameBoard[col-1][row];
            $scope.neighborhood.right = $scope.gameBoard[col+1][row];

            // based on a corner cell that should have only 3 neighbors
        } else {
            if(row === 0 && col === 0) {
                $scope.neighborhood.downCenter = $scope.gameBoard[col][row+1];
                $scope.neighborhood.downRight = $scope.gameBoard[col+1][row+1];
                $scope.neighborhood.right = $scope.gameBoard[col+1][row];
            }
            if(row === 0 && col === $scope.gridColumns - 1){
                $scope.neighborhood.downLeft = $scope.gameBoard[col-1][row+1];
                $scope.neighborhood.downCenter = $scope.gameBoard[col][row+1];
                $scope.neighborhood.left = $scope.gameBoard[col-1][row];
            }
            if(row === $scope.gridRows - 1 && col === 0){
                $scope.neighborhood.upCenter = $scope.gameBoard[col][row-1];
                $scope.neighborhood.upRight = $scope.gameBoard[col+1][row-1];
                $scope.neighborhood.right = $scope.gameBoard[col+1][row];
            }
            if(row === $scope.gridRows - 1 && col === $scope.gridColumns - 1){
                $scope.neighborhood.left = $scope.gameBoard[col-1][row];
                $scope.neighborhood.upLeft = $scope.gameBoard[col-1][row-1];
                $scope.neighborhood.upCenter = $scope.gameBoard[col][row-1];
            }
        }
        // count the number of live cells
        for (var key in $scope.neighborhood) {
            if($scope.neighborhood[key] === true){
                numNeighbors++
            }
        };
        return numNeighbors;
    };
}