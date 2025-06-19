document.addEventListener('DOMContentLoaded', function () {
    // Datos de comandos SQL organizados por categorías y niveles
    const sqlCommands = {
        // FUNDAMENTOS SQL
        fundamentals: [
            {
                title: "SELECT básico",
                code: "SELECT * FROM empleados;",
                description: "Recupera todos los registros y columnas de la tabla empleados.",
                level: "basic"
            },
            {
                title: "SELECT con columnas específicas",
                code: "SELECT nombre, apellido, salario FROM empleados;",
                description: "Recupera solo las columnas especificadas de la tabla.",
                level: "basic"
            },
            {
                title: "WHERE con condición simple",
                code: "SELECT * FROM productos WHERE precio > 100;",
                description: "Filtra productos con precio mayor a 100.",
                level: "basic"
            },
            {
                title: "ORDER BY",
                code: "SELECT * FROM clientes ORDER BY fecha_registro DESC;",
                description: "Ordena clientes por fecha de registro descendente.",
                level: "basic"
            },
            {
                title: "LIMIT",
                code: "SELECT * FROM pedidos LIMIT 10;",
                description: "Obtiene solo los primeros 10 registros.",
                level: "basic"
            },
            {
                title: "DISTINCT",
                code: "SELECT DISTINCT ciudad FROM sucursales;",
                description: "Obtiene valores únicos de la columna ciudad.",
                level: "basic"
            },
            {
                title: "COUNT",
                code: "SELECT COUNT(*) FROM empleados;",
                description: "Cuenta el número total de empleados.",
                level: "basic"
            },
            {
                title: "SUM",
                code: "SELECT SUM(monto) FROM ventas;",
                description: "Calcula la suma total de ventas.",
                level: "basic"
            }
        ],

        // MANIPULACIÓN DE DATOS
        dml: [
            {
                title: "INSERT básico",
                code: "INSERT INTO clientes (nombre, email) VALUES ('Juan Pérez', 'juan@example.com');",
                description: "Inserta un nuevo registro en la tabla clientes.",
                level: "basic"
            },
            {
                title: "INSERT múltiple",
                code: "INSERT INTO productos (nombre, precio) VALUES ('Laptop', 1200), ('Mouse', 25), ('Teclado', 50);",
                description: "Inserta múltiples registros en una sola sentencia.",
                level: "basic"
            },
            {
                title: "UPDATE básico",
                code: "UPDATE empleados SET salario = 3000 WHERE id = 5;",
                description: "Actualiza el salario de un empleado específico.",
                level: "basic"
            },
            {
                title: "DELETE básico",
                code: "DELETE FROM pedidos WHERE estado = 'cancelado';",
                description: "Elimina pedidos con estado 'cancelado'.",
                level: "basic"
            },
            {
                title: "TRUNCATE TABLE",
                code: "TRUNCATE TABLE temporal_data;",
                description: "Elimina todos los registros de una tabla (más rápido que DELETE).",
                level: "intermediate"
            },
            {
                title: "Eliminación con claves foráneas",
                code: `
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM papeleta;

ALTER TABLE vendedoras AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;`,
                description: "Secuencia para eliminar registros con relaciones foráneas.",
                level: "intermediate",
                example: {
                    title: "Caso práctico",
                    description: "Este ejemplo muestra cómo eliminar registros en tablas con relaciones, desactivando temporalmente las restricciones de clave foránea."
                }
            }
        ],

        // ESTRUCTURA DE BASES
        ddl: [
            {
                title: "CREATE TABLE",
                code: `CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    salario DECIMAL(10,2),
    fecha_contratacion DATE
);`,
                description: "Crea una tabla empleados con diferentes tipos de datos.",
                level: "basic"
            },
            {
                title: "ALTER TABLE (añadir columna)",
                code: "ALTER TABLE productos ADD COLUMN descripcion TEXT;",
                description: "Añade una nueva columna a la tabla existente.",
                level: "basic"
            },
            {
                title: "DROP TABLE",
                code: "DROP TABLE temporal_data;",
                description: "Elimina completamente una tabla de la base de datos.",
                level: "basic"
            },
            {
                title: "CREATE INDEX",
                code: "CREATE INDEX idx_cliente_email ON clientes(email);",
                description: "Crea un índice para mejorar búsquedas por email.",
                level: "intermediate"
            },
            {
                title: "CREATE TABLE con FK",
                code: `CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    fecha_pedido DATETIME,
    total DECIMAL(10,2),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);`,
                description: "Crea tabla con relación de clave foránea.",
                level: "intermediate"
            },
            {
                title: "CREATE VIEW",
                code: `CREATE VIEW vista_empleados_departamento AS
SELECT e.nombre, e.apellido, d.nombre AS departamento
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id;`,
                description: "Crea una vista que simplifica consultas complejas.",
                level: "intermediate"
            }
        ],

        // CONSULTAS AVANZADAS
        advanced_queries: [
            {
                title: "JOIN (INNER)",
                code: `SELECT p.id, p.nombre, c.nombre AS categoria
FROM productos p
INNER JOIN categorias c ON p.categoria_id = c.id;`,
                description: "Combina datos de tablas relacionadas.",
                level: "intermediate"
            },
            {
                title: "LEFT JOIN",
                code: `SELECT c.nombre, COUNT(p.id) AS total_pedidos
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id;`,
                description: "Incluye todos los registros de la tabla izquierda aunque no tengan coincidencias.",
                level: "intermediate"
            },
            {
                title: "GROUP BY con HAVING",
                code: `SELECT cliente_id, COUNT(*) AS total_pedidos
FROM pedidos
GROUP BY cliente_id
HAVING COUNT(*) > 5;`,
                description: "Filtra grupos después de la agregación.",
                level: "intermediate"
            },
            {
                title: "Subconsulta en WHERE",
                code: `SELECT nombre, salario
FROM empleados
WHERE salario > (SELECT AVG(salario) FROM empleados);`,
                description: "Usa resultado de una subconsulta como condición.",
                level: "intermediate"
            },
            {
                title: "Subconsulta en FROM",
                code: `SELECT AVG(ventas_totales) 
FROM (
    SELECT cliente_id, SUM(monto) AS ventas_totales
    FROM ventas
    GROUP BY cliente_id
) AS subconsulta;`,
                description: "Usa una subconsulta como tabla temporal.",
                level: "intermediate"
            },
            {
                title: "Common Table Expressions (CTE)",
                code: `WITH ventas_por_region AS (
    SELECT region, SUM(monto) AS total
    FROM ventas
    GROUP BY region
)
SELECT * FROM ventas_por_region
WHERE total > 10000;`,
                description: "Usa tablas temporales con WITH para consultas complejas.",
                level: "advanced"
            },
            {
                title: "Window Functions",
                code: `SELECT nombre, departamento, salario,
       RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS ranking
FROM empleados;`,
                description: "Realiza cálculos sobre un conjunto de filas relacionadas.",
                level: "advanced"
            }
        ],

        // FUNCIONES Y PROCEDIMIENTOS
        functions: [
            {
                title: "Función escalar",
                code: `CREATE FUNCTION calcular_impuesto(monto DECIMAL(10,2)) 
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN monto * 0.16;
END;`,
                description: "Crea una función para calcular impuesto del 16%.",
                level: "advanced"
            },
            {
                title: "Función con condicional",
                code: `CREATE FUNCTION categoria_edad(edad INT) 
RETURNS VARCHAR(20)
BEGIN
    IF edad < 18 THEN RETURN 'Menor';
    ELSEIF edad BETWEEN 18 AND 65 THEN RETURN 'Adulto';
    ELSE RETURN 'Adulto mayor';
    END IF;
END;`,
                description: "Función con lógica condicional.",
                level: "advanced"
            },
            {
                title: "Procedimiento almacenado",
                code: `CREATE PROCEDURE aumentar_salarios(IN porcentaje DECIMAL(5,2))
BEGIN
    UPDATE empleados 
    SET salario = salario * (1 + porcentaje/100)
    WHERE fecha_contratacion < DATE_SUB(NOW(), INTERVAL 1 YEAR);
END;`,
                description: "Procedimiento para aumentar salarios de empleados antiguos.",
                level: "advanced"
            },
            {
                title: "Trigger (disparador)",
                code: `CREATE TRIGGER actualizar_stock
AFTER INSERT ON ventas
FOR EACH ROW
BEGIN
    UPDATE productos 
    SET stock = stock - NEW.cantidad
    WHERE id = NEW.producto_id;
END;`,
                description: "Actualiza automáticamente el stock al registrar una venta.",
                level: "advanced"
            }
        ],

        // SEGURIDAD Y PERMISOS
        security: [
            {
                title: "CREATE USER",
                code: "CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password123';",
                description: "Crea un nuevo usuario de la base de datos.",
                level: "administration"
            },
            {
                title: "GRANT permisos",
                code: "GRANT SELECT, INSERT ON base_datos.* TO 'app_user'@'localhost';",
                description: "Otorga permisos específicos a un usuario.",
                level: "administration"
            },
            {
                title: "REVOKE permisos",
                code: "REVOKE DELETE ON base_datos.* FROM 'app_user'@'localhost';",
                description: "Revoca permisos específicos de un usuario.",
                level: "administration"
            },
            {
                title: "Cambiar contraseña",
                code: "ALTER USER 'app_user'@'localhost' IDENTIFIED BY 'nueva_password456';",
                description: "Actualiza la contraseña de un usuario.",
                level: "administration"
            }
        ],

        // MANTENIMIENTO Y OPTIMIZACIÓN
        maintenance: [
            {
                title: "BACKUP básico",
                code: "mysqldump -u usuario -p base_datos > backup.sql",
                description: "Comando para crear backup de la base de datos (ejecutar en terminal).",
                level: "administration"
            },
            {
                title: "RESTORE backup",
                code: "mysql -u usuario -p base_datos < backup.sql",
                description: "Comando para restaurar base de datos desde backup.",
                level: "administration"
            },
            {
                title: "ANALYZE TABLE",
                code: "ANALYZE TABLE clientes;",
                description: "Actualiza estadísticas de la tabla para optimización.",
                level: "administration"
            },
            {
                title: "OPTIMIZE TABLE",
                code: "OPTIMIZE TABLE pedidos;",
                description: "Reorganiza el almacenamiento físico de la tabla.",
                level: "administration"
            },
            {
                title: "SHOW PROCESSLIST",
                code: "SHOW FULL PROCESSLIST;",
                description: "Muestra todas las conexiones y consultas activas.",
                level: "administration"
            },
            {
                title: "KILL proceso",
                code: "KILL 1234;",
                description: "Termina una consulta específica (usar ID de PROCESSLIST).",
                level: "administration"
            }
        ]
    };

    // Elementos del DOM
    const commandContainers = {
        fundamentals: document.querySelector('.sql-category:nth-child(1) .sql-commands'),
        dml: document.querySelector('.sql-category:nth-child(2) .sql-commands'),
        ddl: document.querySelector('.sql-category:nth-child(3) .sql-commands'),
        advanced_queries: document.querySelector('.sql-category:nth-child(4) .sql-commands'),
        functions: document.querySelector('.sql-category:nth-child(5) .sql-commands'),
        security: document.querySelector('.sql-category:nth-child(6) .sql-commands'),
        maintenance: document.querySelector('.sql-category:nth-child(7) .sql-commands')
    };

    const sqlSearch = document.getElementById('sqlSearch');
    const searchBtn = document.getElementById('searchBtn');
    const notification = document.getElementById('sqlNotification');
    const levelButtons = document.querySelectorAll('.level-btn');

    // Generar comandos iniciales
    generateCommands(sqlCommands);

    // Función para generar los comandos
    function generateCommands(commands, filterLevel = 'all') {
        // Limpiar contenedores
        Object.values(commandContainers).forEach(container => {
            container.innerHTML = '';
        });

        // Generar comandos para cada categoría
        generateCategoryCommands(commands.fundamentals, commandContainers.fundamentals, filterLevel);
        generateCategoryCommands(commands.dml, commandContainers.dml, filterLevel);
        generateCategoryCommands(commands.ddl, commandContainers.ddl, filterLevel);
        generateCategoryCommands(commands.advanced_queries, commandContainers.advanced_queries, filterLevel);
        generateCategoryCommands(commands.functions, commandContainers.functions, filterLevel);
        generateCategoryCommands(commands.security, commandContainers.security, filterLevel);
        generateCategoryCommands(commands.maintenance, commandContainers.maintenance, filterLevel);

        // Configurar botones de copiar
        setupCopyButtons();
    }

    // Generar comandos para una categoría específica
    function generateCategoryCommands(commands, container, filterLevel) {
        commands.forEach(cmd => {
            if (filterLevel === 'all' || cmd.level === filterLevel) {
                createCommandElement(cmd, container);
            }
        });
    }

    // Crear elemento de comando
    function createCommandElement(cmd, container) {
        const commandElement = document.createElement('div');
        commandElement.className = 'sql-command';
        commandElement.setAttribute('data-level', cmd.level);

        let exampleHtml = '';
        if (cmd.example) {
            exampleHtml = `
                <div class="sql-complex-example">
                    <div class="example-title">
                        <i class="fas fa-lightbulb"></i>
                        ${cmd.example.title}
                    </div>
                    <p class="example-description">${cmd.example.description}</p>
                </div>
            `;
        }

        commandElement.innerHTML = `
            <div class="command-header">
                <div class="command-title">
                    ${cmd.title}
                    <span class="command-level level-${cmd.level}">${getLevelName(cmd.level)}</span>
                </div>
                <button class="command-copy" data-code="${escapeHtml(cmd.code)}">
                    <i class="far fa-copy"></i> Copiar
                </button>
            </div>
            <div class="command-content">
                <div class="sql-code">${highlightSql(cmd.code)}</div>
                <p class="command-description">${cmd.description}</p>
                ${exampleHtml}
            </div>
        `;
        container.appendChild(commandElement);
    }

    // Obtener nombre completo del nivel
    function getLevelName(level) {
        const levels = {
            'basic': 'Básico',
            'intermediate': 'Intermedio',
            'advanced': 'Avanzado',
            'administration': 'Admin'
        };
        return levels[level] || level;
    }

    // Escapar HTML para seguridad
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Resaltar sintaxis SQL básica
    function highlightSql(sql) {
        return sql
            .replace(/(SELECT|FROM|WHERE|ORDER BY|GROUP BY|HAVING|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|INSERT|UPDATE|DELETE|MERGE|CREATE|ALTER|DROP|DESCRIBE|TRUNCATE|INTO|TABLE|INDEX|VIEW|FUNCTION|PROCEDURE|TRIGGER|SET|VALUES|ON|WHEN|THEN|ELSE|END|BEGIN|AND|OR|NOT|AS|ASC|DESC|WITH|RANK|OVER|PARTITION|BY|RETURNS|DETERMINISTIC|IF|THEN|ELSEIF)\b/gi,
                '<span class="sql-keyword">$1</span>')
            .replace(/(\b[A-Z_]+\b)(?=\()/g,
                '<span class="sql-function">$1</span>')
            .replace(/(\b\d+\b)/g,
                '<span class="sql-number">$1</span>')
            .replace(/('.*?'|".*?")/g,
                '<span class="sql-string">$1</span>')
            .replace(/--.*$/gm,
                '<span class="sql-comment">$&</span>');
    }

    // Configurar botones de copiar
    function setupCopyButtons() {
        document.querySelectorAll('.command-copy').forEach(btn => {
            btn.addEventListener('click', function () {
                const code = this.getAttribute('data-code');
                copyToClipboard(code);

                // Efecto visual
                this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                this.style.background = 'var(--sql-success)';

                setTimeout(() => {
                    this.innerHTML = '<i class="far fa-copy"></i> Copiar';
                    this.style.background = 'var(--sql-primary)';
                }, 2000);
            });
        });
    }

    // Copiar al portapapeles
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification();
        }).catch(err => {
            console.error('Error al copiar: ', err);
            notification.textContent = "Error al copiar";
            notification.style.background = "#e74c3c";
            showNotification();

            setTimeout(() => {
                notification.innerHTML = '<i class="fas fa-check-circle"></i> Comando copiado!';
                notification.style.background = 'var(--sql-success)';
            }, 3000);
        });
    }

    // Mostrar notificación
    function showNotification() {
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Buscar comandos
    function searchCommands() {
        const searchTerm = sqlSearch.value.toLowerCase();
        const activeLevel = document.querySelector('.level-btn.active').dataset.level;

        if (searchTerm === '' && activeLevel === 'all') {
            generateCommands(sqlCommands);
            return;
        }

        const filteredCommands = {
            fundamentals: sqlCommands.fundamentals.filter(cmd =>
                (activeLevel === 'all' || cmd.level === activeLevel) &&
                (cmd.title.toLowerCase().includes(searchTerm) ||
                    cmd.code.toLowerCase().includes(searchTerm) ||
                    cmd.description.toLowerCase().includes(searchTerm))
            ),
            dml: sqlCommands.dml.filter(cmd =>
                (activeLevel === 'all' || cmd.level === activeLevel) &&
                (cmd.title.toLowerCase().includes(searchTerm) ||
                    cmd.code.toLowerCase().includes(searchTerm) ||
                    cmd.description.toLowerCase().includes(searchTerm))
            ),
            ddl: sqlCommands.ddl.filter(cmd =>
                (activeLevel === 'all' || cmd.level === activeLevel) &&
                (cmd.title.toLowerCase().includes(searchTerm) ||
                    cmd.code.toLowerCase().includes(searchTerm) ||
                    cmd.description.toLowerCase().includes(searchTerm))
            ),
            advanced_queries: sqlCommands.advanced_queries.filter(cmd =>
                (activeLevel === 'all' || cmd.level === activeLevel) &&
                (cmd.title.toLowerCase().includes(searchTerm) ||
                    cmd.code.toLowerCase().includes(searchTerm) ||
                    cmd.description.toLowerCase().includes(searchTerm))
            ),
            functions: sqlCommands.functions.filter(cmd =>
                (activeLevel === 'all' || cmd.level === activeLevel) &&
                (cmd.title.toLowerCase().includes(searchTerm) ||
                    cmd.code.toLowerCase().includes(searchTerm) ||
                    cmd.description.toLowerCase().includes(searchTerm))
            ),
            security: sqlCommands.security.filter(cmd =>
                (activeLevel === 'all' || cmd.level === activeLevel) &&
                (cmd.title.toLowerCase().includes(searchTerm) ||
                    cmd.code.toLowerCase().includes(searchTerm) ||
                    cmd.description.toLowerCase().includes(searchTerm))
            ),
            maintenance: sqlCommands.maintenance.filter(cmd =>
                (activeLevel === 'all' || cmd.level === activeLevel) &&
                (cmd.title.toLowerCase().includes(searchTerm) ||
                    cmd.code.toLowerCase().includes(searchTerm) ||
                    cmd.description.toLowerCase().includes(searchTerm))
            )
        };

        generateCommands(filteredCommands, activeLevel);
    }

    // Filtrar por nivel
    function filterByLevel() {
        const level = this.dataset.level;
        levelButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        searchCommands();
    }

    // Event listeners
    searchBtn.addEventListener('click', searchCommands);
    sqlSearch.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            searchCommands();
        }
    });
    levelButtons.forEach(btn => {
        btn.addEventListener('click', filterByLevel);
    });
});

// Añadir estilos para resaltado SQL
const sqlStyles = document.createElement('style');
sqlStyles.textContent = `
    .sql-keyword {
        color: var(--sql-primary);
        font-weight: bold;
    }
    
    .sql-function {
        color: #8e44ad;
    }
    
    .sql-number {
        color: #e67e22;
    }
    
    .sql-string {
        color: #27ae60;
    }
    
    .sql-comment {
        color: #95a5a6;
        font-style: italic;
    }
`;
document.head.appendChild(sqlStyles);