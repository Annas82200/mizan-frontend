import { MCPError, ErrorCodes } from '@mizan-mcp/shared';

/**
 * Default allowed commands for execution
 */
export const DEFAULT_ALLOWLIST = [
  'pytest',
  'ruff',
  'npm test',
  'npm run lint',
  'npm run build',
  'git status',
  'git diff',
  'git log',
];

/**
 * Validate command against allowlist
 *
 * @param command - Command to validate
 * @param allowlist - Array of allowed commands
 * @throws MCPError if command is not allowed
 */
export function validateCommand(
  command: string,
  allowlist: string[] = DEFAULT_ALLOWLIST
): void {
  if (!command || command.trim().length === 0) {
    throw new MCPError(
      'Command cannot be empty',
      ErrorCodes.INVALID_INPUT,
      400
    );
  }

  const trimmedCommand = command.trim();

  // Extract base command (first word)
  const baseCommand = trimmedCommand.split(' ')[0];

  // Check for dangerous characters
  const dangerousPatterns = [
    '|',    // Pipe
    ';',    // Command separator
    '&&',   // And operator
    '||',   // Or operator
    '>',    // Redirect
    '<',    // Redirect
    '`',    // Command substitution
    '$(',   // Command substitution
    '\n',   // Newline
    '\r',   // Carriage return
  ];

  for (const pattern of dangerousPatterns) {
    if (trimmedCommand.includes(pattern)) {
      throw new MCPError(
        `Command contains dangerous pattern: ${pattern}`,
        ErrorCodes.COMMAND_NOT_ALLOWED,
        403,
        {
          command: trimmedCommand,
          dangerousPattern: pattern,
        }
      );
    }
  }

  // Check exact match
  if (allowlist.includes(trimmedCommand)) {
    return;
  }

  // Check base command match
  if (allowlist.includes(baseCommand)) {
    return;
  }

  // Check starts-with match (e.g., "npm test" matches "npm test --coverage")
  if (allowlist.some((allowed) => trimmedCommand.startsWith(allowed + ' '))) {
    return;
  }

  // Command not allowed
  throw new MCPError(
    `Command not allowed: ${baseCommand}`,
    ErrorCodes.COMMAND_NOT_ALLOWED,
    403,
    {
      command: trimmedCommand,
      baseCommand,
      allowedCommands: allowlist,
    }
  );
}

/**
 * Parse allowed commands from environment variable
 *
 * @param allowedCommandsEnv - Comma-separated list of allowed commands
 * @returns Array of allowed commands
 */
export function parseAllowedCommands(
  allowedCommandsEnv?: string
): string[] {
  if (!allowedCommandsEnv) {
    return DEFAULT_ALLOWLIST;
  }

  return allowedCommandsEnv
    .split(',')
    .map((cmd) => cmd.trim())
    .filter((cmd) => cmd.length > 0);
}

/**
 * Check if command is safe to execute
 *
 * @param command - Command to check
 * @returns True if command appears safe (basic check)
 */
export function isCommandSafe(command: string): boolean {
  try {
    validateCommand(command, DEFAULT_ALLOWLIST);
    return true;
  } catch {
    return false;
  }
}
