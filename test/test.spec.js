describe('LifeApp Test Suite', function(){

    describe('Testing ViewCtrl', function () {

        it('should initialize with gridRows, gridColumns, gameBoard', function() {
            module('lifeApp');

            var scope = {};
            var ctrl;

            inject(function($controller) {
                ctrl = $controller('ViewCtrl', {$scope:scope});
            });

            expect(scope.gameBoard).toBeDefined();
            expect(scope.nextGameBoard).toBeDefined();
            expect(scope.gridRows).toBe(8);
            expect(scope.gridColumns).toBe(6);
        });

        it('should add columns and rows to $scope.gameBoard', function() {
            module('lifeApp');

            var scope = {};
            var ctrl;

            inject(function($controller) {
                ctrl = $controller('ViewCtrl', {$scope:scope});
            });

            scope.update();
            expect(scope.gameBoard[5]).toBeDefined();
            expect(scope.gameBoard.length).toEqual(6);
            expect(scope.gameBoard[0].length).toEqual(8);
        });

        it('should set a cell equal to true', function() {
            module('lifeApp');

            var scope = {};
            var ctrl;

            inject(function($controller) {
                ctrl = $controller('ViewCtrl', {$scope:scope});
            });

            scope.update();
            scope.updateArray(4, 4);
            expect(scope.gameBoard[4][4]).toEqual(true);
        });

        it('should get 8 neighbors for a center cell', function() {
            module('lifeApp');

            var scope = {};
            var ctrl;

            inject(function($controller) {
                ctrl = $controller('ViewCtrl', {$scope:scope});
            });

            scope.update();
            scope.checkNeighbors(2, 2);
            expect(Object.keys(scope.neighborhood).length).toEqual(8);
            scope.checkNeighbors(4, 3);
            expect(Object.keys(scope.neighborhood).length).toEqual(8);
        });

        it('should get 5 neighbors for a border cell', function() {
            module('lifeApp');

            var scope = {};
            var ctrl;

            inject(function($controller) {
                ctrl = $controller('ViewCtrl', {$scope:scope});
            });

            scope.update();
            scope.checkNeighbors(0, 3);
            expect(Object.keys(scope.neighborhood).length).toEqual(5);
            scope.checkNeighbors(scope.gridColumns - 1, 4);
            expect(Object.keys(scope.neighborhood).length).toEqual(5);
        });

        it('should get 3 neighbors for a corner cell', function() {
            module('lifeApp');

            var scope = {};
            var ctrl;

            inject(function($controller) {
                ctrl = $controller('ViewCtrl', {$scope:scope});
            });

            scope.update();
            scope.checkNeighbors(0, 0);
            expect(Object.keys(scope.neighborhood).length).toEqual(3);
            scope.checkNeighbors(scope.gridColumns - 1, scope.gridRows - 1);
            expect(Object.keys(scope.neighborhood).length).toEqual(3);
        });

        it('should set gameBoard equal to nextGameBoard and then clear nextGameBoard', function() {
            module('lifeApp');

            var scope = {};
            var ctrl;

            inject(function($controller) {
                ctrl = $controller('ViewCtrl', {$scope:scope});
            });

            scope.update();
            scope.updateArray(4, 4);
            scope.nextStage();
            expect(scope.gameBoard).not.toEqual(scope.nextGameBoard);
            scope.updateGameBoard();
            setTimeout(function () {
                expect(scope.gameBoard).toEqual(scope.nextGameBoard);
                expect(scope.nextGameBoard).toEqual([]);
            }, 300);
        });

    });
});