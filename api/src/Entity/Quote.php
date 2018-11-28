<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     graphql={
 *          "query",
 *          "delete",
 *          "update",
 *          "create"
 *     }
 * )
 * @ApiFilter(SearchFilter::class, properties={"slug"="exact"})
 * @ApiFilter(OrderFilter::class, properties={"createdAt"}, arguments={"orderParameterName"="order"})
 * @ORM\Entity()
 * @ORM\Table(
 *     indexes={
 *          @ORM\Index(name="quote_created_at", columns={"created_at"}),
 *          @ORM\Index(name="quote_slug", columns={"slug"}),
 *     }
 * )
 * @ORM\HasLifecycleCallbacks()
 */
class Quote
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\Column(type="uuid")
     *
     * @var UuidInterface
     */
    private $id;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="string", nullable=false)
     *
     * @var string
     */
    private $title;

    /**
     * @Gedmo\Slug(fields={"title"}, unique=true, separator="-", updatable=true)
     * @ORM\Column(type="string", nullable=false)
     *
     * @var string
     */
    private $slug;

    /**
     * @Assert\NotBlank()
     * @Assert\Email(checkMX=true, checkHost=true)
     * @ORM\Column(type="string", nullable=false)
     *
     * @var string
     */
    private $author;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="text", nullable=false)
     *
     * @var string
     */
    private $text;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=false)
     *
     * @var \DateTimeInterface
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=false)
     *
     * @var \DateTimeInterface
     */
    private $updatedAt;

    public function __construct()
    {
        $this->id        = Uuid::uuid4();
        $this->createdAt = new \DateTimeImmutable;
        $this->updatedAt = new \DateTimeImmutable;
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): void
    {
        $this->slug = $slug;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    public function getText(): string
    {
        return $this->text;
    }

    public function setText(string $text): void
    {
        $this->text = $text;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): \DateTimeInterface
    {
        return $this->updatedAt;
    }

    /**
     * @ORM\PreUpdate()
     */
    public function preUpdate()
    {
        $this->updatedAt = new \DateTimeImmutable;
    }
}
