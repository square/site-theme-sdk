module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:jsonc/recommended-with-jsonc'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		},
		{
			'files': ['*.json', '*.json5', '*.jsonc'],
			'parser': 'jsonc-eslint-parser',
		},
		{
			'files': ['*.ts', '*.tsx'],
			'plugins': [
				'import'
			],
			'extends': [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			'parserOptions': {
				'project': ['./tsconfig.json'],
			},
			'settings': {
				'import/parsers': {
					'@typescript-eslint/parser': ['.ts', '.tsx']
				},
				'import/resolver': {
					'typescript': {
						'alwaysTryTypes': true,
						'project': './tsconfig.json'
					}
				}
			},
			'rules': {
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'variable',
						format: ['camelCase', 'PascalCase', 'UPPER_CASE']
					},
					{
						selector: 'typeProperty',
						format: ['camelCase', 'PascalCase', 'UPPER_CASE']
					}
				],
				'@typescript-eslint/no-unsafe-assignment': [
					'off'
				],
				'import/named': 'error',
				'@typescript-eslint/type-annotation-spacing': 'error',
				'no-multiple-empty-lines': [
					'error',
					{ max: 1 }
				],
				'@typescript-eslint/member-delimiter-style': [
					'error',
					{
						'multiline': {
							'delimiter': 'semi',
							'requireLast': true
						},
						'singleline': {
							'delimiter': 'semi',
							'requireLast': false
						}
					}
				]
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
	},
	'plugins': [
		'@typescript-eslint'
	],
	'ignorePatterns': ['**/docs/*', '**/lib/*', '**/bin/*'],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-console': [
			'error'
		]
	}
};
