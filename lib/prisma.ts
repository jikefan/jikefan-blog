import { PrismaClient } from "@prisma/client";

import { DATABASE_URL, NODE_ENV } from "@/config";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        datasourceUrl: DATABASE_URL,
        log: NODE_ENV === "development" ? ["warn", "error"] : undefined,
    });

if (NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

/**
在生产环境中，每次请求都创建新的数据库连接（即每次都重新连接数据库）看似效率低下，但实际上这是为了确保最佳的性能、可扩展性和稳定性。以下是这样做的几个主要原因：

1. 多进程架构
在生产环境中，Web服务器通常会运行多个工作进程或线程来处理并发请求。每个工作进程是独立的，并且拥有自己的内存空间和资源。如果使用单例模式（Singleton Pattern）共享一个PrismaClient实例，可能会导致不同进程间的状态同步问题，或者当一个进程崩溃时影响其他进程。

因此，在多进程环境中，每个进程都应该有自己的PrismaClient实例，以确保它们之间的隔离性和独立性。这样做可以避免由于全局状态共享带来的潜在竞争条件和其他并发问题。

2. 连接池管理
现代数据库驱动程序（包括Prisma Client）内部实现了连接池（Connection Pooling）。连接池是一种优化机制，它维护了一组预先建立的数据库连接，以便快速响应应用程序的请求。当你“创建”一个新的PrismaClient实例时，实际上是从连接池中获取一个已有的连接，而不是真正地创建一个新的TCP连接。

当你调用new PrismaClient()时，Prisma Client会尝试从连接池中借用一个空闲的连接。
使用完毕后，该连接会被归还给连接池，而不是被关闭。
连接池能够有效地管理和复用数据库连接，从而提高了性能并减少了数据库服务器的负载。
3. 容错与恢复
在生产环境中，保持灵活性和健壮性非常重要。如果所有的工作进程共享同一个数据库连接，并且这个连接出现问题（例如，网络中断或超时），那么整个应用可能都会受到影响。相反，如果每个进程都有自己的连接，即使某个连接失效，其他进程仍然可以继续正常工作，不会受到单一故障点的影响。

此外，通过配置连接池的最大连接数等参数，你可以更好地控制资源使用情况，防止因过多的并发连接而耗尽数据库资源。

4. 水平扩展
随着流量的增长，你可能会选择水平扩展你的应用，即增加更多的服务器实例来分担负载。每个实例都有自己独立的一组工作进程，这些进程应该各自管理自己的数据库连接。这种方式使得应用更容易扩展，因为新增加的实例不需要依赖于现有的全局状态或连接。
 */